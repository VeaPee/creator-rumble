// src/routes/seasons/creator-rumble-season-1/+page.server.ts
import { CREATORS } from '#lib/data/season1';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

const API = 'https://www.googleapis.com/youtube/v3';
const CACHE_DURATION = 5 * 60 * 1000; // Cache 5 menit
const RECENT_VIDEOS_PER_CHANNEL = 5; // jumlah video terbaru yang dicek per kanal

type PageData = { creators: any[]; liveCount: number };

// Cache hasil akhir (hanya diisi kalau tidak ada error API)
let cachedData: PageData | null = null;
let lastFetchTime = 0;
let inflight: Promise<PageData> | null = null; // cegah request ganda saat cache kedaluwarsa

// handle -> ID playlist "uploads" (tidak berubah, jadi disimpan permanen: 1 unit sekali saja)
const uploadsPlaylistCache = new Map<string, string>();
console.log(
  'YOUTUBE_API_KEY terbaca?', Boolean(env.YOUTUBE_API_KEY),
  '| jumlah env:', Object.keys(env).length,
  '| mengandung YOUTUBE:', Object.keys(env).filter((k) => k.includes('YOUTUBE'))
);
async function ytFetch(path: string, params: Record<string, string>) {
  const key = env.YOUTUBE_API_KEY ?? process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error('YOUTUBE_API_KEY belum diset di environment');
  console.log('process.env:', Object.keys(process.env).length, 'key ada?', Boolean(process.env.YOUTUBE_API_KEY));
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

// channels.list = 1 unit, hanya dipanggil sekali per handle
async function getUploadsPlaylistId(handle: string): Promise<string | null> {
  const cached = uploadsPlaylistCache.get(handle);
  if (cached) return cached;

  const data = await ytFetch('channels', { part: 'contentDetails', forHandle: handle });
  const playlistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) return null;

  uploadsPlaylistCache.set(handle, playlistId);
  return playlistId;
}

// playlistItems.list = 1 unit
async function getRecentVideoIds(playlistId: string): Promise<string[]> {
  const data = await ytFetch('playlistItems', {
    part: 'contentDetails',
    playlistId,
    maxResults: String(RECENT_VIDEOS_PER_CHANNEL)
  });
  return (data.items ?? []).map((i: any) => i.contentDetails.videoId);
}

// videos.list = 1 unit per panggilan, bisa sampai 50 ID sekaligus
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

async function buildData(): Promise<{ data: PageData; hadError: boolean }> {
  const creators = Object.values(CREATORS);
  let hadError = false;

  // Tahap 1: ambil video terbaru tiap kreator
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

  // Tahap 2: satu panggilan (atau beberapa chunk) untuk cek status live semua video
  let liveIds = new Set<string>();
  try {
    liveIds = await getLiveVideoIds([...new Set(videoIdsByCreator.flat())]);
  } catch (error) {
    hadError = true;
    console.error('Gagal memeriksa status live YouTube:', error);
  }

  const creatorsWithLiveStatus = creators.map((creator, idx) => ({
    ...creator,
    isLive: videoIdsByCreator[idx].some((id) => liveIds.has(id))
  }));

  return {
    data: {
      creators: creatorsWithLiveStatus,
      liveCount: creatorsWithLiveStatus.filter((c) => c.isLive).length
    },
    hadError
  };
}

async function refresh(): Promise<PageData> {
  const { data, hadError } = await buildData();

  if (hadError) {
    // Jangan cache hasil yang error; pakai data lama kalau ada
    return cachedData ?? data;
  }

  cachedData = data;
  lastFetchTime = Date.now();
  return data;
}

export const load: PageServerLoad = async () => {
  if (cachedData && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }

  if (!inflight) {
    inflight = refresh().finally(() => {
      inflight = null;
    });
  }
  return inflight;
};