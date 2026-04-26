/** Stock video URLs (Pexels CDN) — replace with your own assets in production. */
export const cinematicVideos = {
  hero: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4",
  featured: "https://videos.pexels.com/video-files/2491281/2491281-hd_1920_1080_30fps.mp4",
  elite: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
  cityBanjara: "https://videos.pexels.com/video-files/1448735/1448735-hd_1920_1080_30fps.mp4",
  cityJubilee: "https://videos.pexels.com/video-files/2499611/2499611-hd_1920_1080_30fps.mp4",
  cityGachibowli: "https://videos.pexels.com/video-files/257927/257927-hd_1920_1080_30fps.mp4",
  vip: "https://videos.pexels.com/video-files/2711114/2711114-hd_1920_1080_30fps.mp4",
  cta: "https://videos.pexels.com/video-files/3129591/3129591-hd_1920_1080_30fps.mp4"
} as const;

export const cinematicPosters: Record<keyof typeof cinematicVideos, string> = {
  hero: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2560&q=100",
  featured: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2560&q=100",
  elite: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba0?auto=format&fit=crop&w=2560&q=100",
  cityBanjara: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=2560&q=100",
  cityJubilee: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2560&q=100",
  cityGachibowli: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2560&q=100",
  vip: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2560&q=100",
  cta: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2560&q=100"
};

export type CinematicSectionKey = keyof typeof cinematicVideos;

export const sectionVideoOrder: CinematicSectionKey[] = [
  "hero",
  "featured",
  "elite",
  "cityBanjara",
  "cityJubilee",
  "cityGachibowli",
  "vip",
  "cta"
];
