// YouTube thumbnail helper — free, stable, served from Google CDN
const YT = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

export const media = {
  hero: {
    // Local assets first — always load immediately
    poster: '/media/hero/hero-poster.webp',
    posterPng: '/media/hero/hero-poster.png',
    videoMp4: '',
    videoWebm: '',
    fallbackMp4: '',
  },

  trailers: {
    blackops: '',
    warzone: '',
    diablo: '',
    sekiro: '',
    hawk: '',
  },

  // Game visuals — uses local assets where available, YouTube thumbnails otherwise
  // These serve as fallbacks when game.image fails
  visuals: {
    blackops: '/media/games/blackops.png',
    warzone: '/media/games/warzone.png',
    crash: '/media/games/crash.png',
    hawk: '/media/games/hawk.png',
    sekiro: '/media/games/sekiro.png',

    // YouTube-thumbnail backed where no local asset exists
    mw3: YT('cXcf3j_3F30'),
    cod: YT('cXcf3j_3F30'),
    diablo: YT('0SSYzl9fXOQ'),
    overwatch: YT('dZl1yGUetjI'),
    spyro: YT('J_p-iN3qjfg'),

    // Studio & Ops visuals — kept from original design
    studio: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    studioCulture: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    motionCapture: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80',
    audioLab: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    engineTech: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    project: '/media/games/blackops.png',
    careers: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    news: '/media/games/warzone.png',
  },
}
