// src/routes/seasons/creator-rumble-season-1/+page.server.ts
import { CREATORS } from '#lib/data/season1';
import type { PageServerLoad } from './$types';
import { YOUTUBE_API_KEY } from '$env/static/private';

// Variabel untuk menyimpan cache di memori server
let cachedData: { creators: any[]; liveCount: number } | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // Cache 5 menit

async function checkChannelLiveStatus(youtubeUrl: string): Promise<boolean> {
  try {
    const handleMatch = youtubeUrl.match(/@([a-zA-Z0-9_-]+)/);
    if (!handleMatch) return false;
    const handle = handleMatch[1];

    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${YOUTUBE_API_KEY}`
    );
    const channelData = await channelRes.json();
    if (!channelData.items || channelData.items.length === 0) return false;
    const channelId = channelData.items[0].id;

    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
    );
    const searchData = await searchRes.json();
console.log(searchData)
    return searchData.items && searchData.items.length > 0;
  } catch (error) {
    console.error('Gagal memeriksa status live YouTube:', error);
    return false;
  }
}

export const load: PageServerLoad = async () => {
  const currentTime = Date.now();

  if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }

  const creatorsWithLiveStatus = await Promise.all(
    Object.values(CREATORS).map(async (creator) => {
      let isLive = false;
      if (creator.youtubeUrl) {
        isLive = await checkChannelLiveStatus(creator.youtubeUrl);
      }
      return {
        ...creator,
        isLive
      };
    })
  );

  const liveCount = creatorsWithLiveStatus.filter((c) => c.isLive).length;

  cachedData = {
    creators: creatorsWithLiveStatus,
    liveCount
  };
  lastFetchTime = currentTime;

  return cachedData;
};