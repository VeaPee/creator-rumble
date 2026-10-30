// src/lib/server/youtube-live.ts
import { env } from '$env/dynamic/private';

const API = 'https://www.googleapis.com/youtube/v3';
const CACHE_DURATION = 5 * 60 * 1000; // Cache 5 menit
const RECENT_VIDEOS_PER_CHANNEL = 5;

type WithYoutube = { youtubeUrl?: string };
export type LiveResult<T> = { creators: (T & { isLive: boolean })[]; liveCount: number };

type CacheEntry = { data: LiveResult<any>; time: number };

// Cache per kumpulan kreator (kunci = daftar youtubeUrl), dipakai bersama semua halaman
const resultCache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<LiveResult<any>>>();

// handle -> ID playlist "uploads" (tidak berubah, simpan permanen)
const uploadsPlaylistCache = new Map<string, string>();

async function ytFetch(path: string, params: Record<string, string>) {
  const key = env.YOUTUBE_API_KEY ?? process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error('YOUTUBE_API_KEY belum diset di environment');

  const res = await fetch(`${API}/${path}?${new URLSearchParams({ ...params, key })}`);
  const data = await res.json();

  if (data.error) {
    throw new Error(`[YouTube API] ${data.error.code}: ${data.error.message}`);
  }
  return data;
}

function extractHandle(youtubeUrl: string): string | null {
  const match = youtubeUrl.match(/@([a-zA-Z0-9_.-]+)/);
  return match ? match[1] : null;
}

async function getUploadsPlaylistId(handle: string): Promise<string | null> {
  const cached = uploadsPlaylistCache.get(handle);
  if (cached) return cached;

  const data = await ytFetch('channels', { part: 'contentDetails', forHandle: handle });
  const playlistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) return null;

  uploadsPlaylistCache.set(handle, playlistId);
  return playlistId;
}

async function getRecentVideoIds(playlistId: string): Promise<string[]> {
  const data = await ytFetch('playlistItems', {
    part: 'contentDetails',
    playlistId,
    maxResults: String(RECENT_VIDEOS_PER_CHANNEL)
  });
  return (data.items ?? []).map((i: any) => i.contentDetails.videoId);
}

async function getLiveVideoIds(videoIds: string[]): Promise<Set<string>> {
  const live = new Set<string>();
  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50);
    const data = await ytFetch('videos', {
      part: 'snippet',
      id: chunk.join(','),
      fields: 'items(id,snippet/liveBroadcastContent)'
    });
    for (const v of data.items ?? []) {
      if (v.snippet?.liveBroadcastContent === 'live') live.add(v.id);
    }
  }
  return live;
}

async function build<T extends WithYoutube>(
  creators: T[]
): Promise<{ data: LiveResult<T>; hadError: boolean }> {
  let hadError = false;

  const videoIdsByCreator = await Promise.all(
    creators.map(async (creator) => {
      if (!creator.youtubeUrl) return [] as string[];
      try {
        const handle = extractHandle(creator.youtubeUrl);
        if (!handle) return [];
        const playlistId = await getUploadsPlaylistId(handle);
        if (!playlistId) return [];
        return await getRecentVideoIds(playlistId);
      } catch (error) {
        hadError = true;
        console.error(`Gagal mengambil video untuk ${creator.youtubeUrl}:`, error);
        return [];
      }
    })
  );

  let liveIds = new Set<string>();
  try {
    liveIds = await getLiveVideoIds([...new Set(videoIdsByCreator.flat())]);
  } catch (error) {
    hadError = true;
    console.error('Gagal memeriksa status live YouTube:', error);
  }

  const withStatus = creators.map((creator, idx) => ({
    ...creator,
    isLive: videoIdsByCreator[idx].some((id) => liveIds.has(id))
  }));

  return {
    data: { creators: withStatus, liveCount: withStatus.filter((c) => c.isLive).length },
    hadError
  };
}

/**
 * Tambahkan `isLive` ke setiap kreator dan hitung `liveCount`.
 * Hasil di-cache 5 menit dan dibagi antar halaman yang memakai daftar kreator yang sama.
 */
export async function getLiveCreators<T extends WithYoutube>(
  creators: T[]
): Promise<LiveResult<T>> {
  const cacheKey = creators.map((c) => c.youtubeUrl ?? '').join('|');

  const cached = resultCache.get(cacheKey);
  if (cached && Date.now() - cached.time < CACHE_DURATION) return cached.data;

  let pending = inflight.get(cacheKey);
  if (!pending) {
    pending = (async () => {
      const { data, hadError } = await build(creators);
      if (hadError) return cached?.data ?? data; // jangan cache hasil yang error
      resultCache.set(cacheKey, { data, time: Date.now() });
      return data;
    })().finally(() => inflight.delete(cacheKey));
    inflight.set(cacheKey, pending);
  }
  return pending;
}