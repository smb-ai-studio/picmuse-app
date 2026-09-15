export const product = {
  id: "picmuse",
  brandName: "PicMuse",
  legalName: "BoRui Software Limited",
  domain: "https://picmuse.app",
  defaultLocale: "en",
  availableLocales: ["en"],
  plannedLocales: ["zh-tw", "ko", "ja", "de", "es"],
  android: {
    appName: "AI Video Generator: PicMuse",
    packageName: "com.smb.picmuse",
    platformName: "Google Play",
    storeUrl: "https://play.google.com/store/apps/details?id=com.smb.picmuse"
  },
  ios: {
    currentStoreName: "PicSelf",
    note: "PicMuse and PicSelf share accounts, works, subscriptions, and credits. The first website release focuses on Android."
  },
  contentRating: {
    minimumAge: "18+",
    note: "Some portrait and body-editing features are intended for adults and are not used as primary homepage visuals."
  },
  legalLinks: {
    terms: "https://www.picself.ai/terms-conditions.html",
    privacy: "https://www.picself.ai/privacy-policy.html",
    userAgreement: "https://www.picself.ai/user-agreement.html"
  },
  analytics: {
    measurementIdEnv: "PUBLIC_GA_MEASUREMENT_ID",
    events: {
      storeClick: "store_click"
    }
  },
  utm: {
    utm_source: "picmuse_app",
    utm_medium: "official_site",
    utm_campaign: "seo_mvp"
  }
} as const;

export type Locale = (typeof product.availableLocales)[number];

export const homepageFeatures = [
  {
    name: "AI Video Generator",
    summary: "Turn prompts and creative ideas into short AI videos for social posts, reels, stories, and experiments.",
    tag: "Text to video"
  },
  {
    name: "Image to Video",
    summary: "Bring portraits, product shots, pets, and scenes into motion from a still image.",
    tag: "Photo motion"
  },
  {
    name: "AI Image Generator",
    summary: "Create stylized images, profile visuals, social assets, and concept art from text prompts.",
    tag: "Prompt to image"
  },
  {
    name: "AI Photo Editor",
    summary: "Enhance details, refresh portraits, clean up images, and make everyday photos feel more finished.",
    tag: "Photo enhancer"
  },
  {
    name: "Trend Inspiration",
    summary: "Start faster from trending ideas, creative templates, and reusable visual directions.",
    tag: "Templates"
  }
] as const;

