export const SHOP_NAME = "Olivia's Pet Spa";

export const CANVAS_SIZE = 1080;
export const TOP_MARGIN = 50;
export const CAPTION_BAND_HEIGHT = 260;
export const PHOTO_HEIGHT = 770; // CANVAS_SIZE - TOP_MARGIN - CAPTION_BAND_HEIGHT
export const CAPTION_Y = 820; // TOP_MARGIN + PHOTO_HEIGHT

export const SINGLE_LAYOUT = {
  canvas: CANVAS_SIZE,
  photoWidth: 770,
  photoHeight: 770,
  photoX: 155, // (1080 - 770) / 2 = 155
  photoY: TOP_MARGIN,
  logoBadgeRadius: 56, // ~112px diameter
  logoInset: 22, // distance from bottom-right corner
  minSourceWidth: 1000,
  minSourceHeight: 1000,
} as const;

export const BEFORE_AFTER_LAYOUT = {
  canvas: CANVAS_SIZE,
  photoWidth: 458,
  photoHeight: 770,
  photoRatio: 41 / 69,
  leftPhotoX: 74,
  rightPhotoX: 548,
  photoY: TOP_MARGIN,
  gapBetween: 16,
  logoBadgeRadius: 45,
  logoX: 540,
  logoY: 750,
  minSourceWidth: 916,
  minSourceHeight: 1540,
} as const;

export const CAPTION_LAYOUT = {
  y: CAPTION_Y,
  height: CAPTION_BAND_HEIGHT,
  leftMargin: 80,
  rightMargin: 80,
  textWidth: CANVAS_SIZE - 80 - 80,
  shopName: {
    fontSize: 22,
    fontFamily: "Inter, Arial, sans-serif",
    fontWeight: 500, // Medium
    letterSpacing: 2,
    fill: "#000",
    baseline: CAPTION_Y + 30,
  },
  heroLine: {
    fontSize: 52,
    fontFamily: "Playfair Display, Georgia, serif",
    fontWeight: 700,
    fill: "#000",
    baseline: CAPTION_Y + 95,
  },
  subLine: {
    fontSize: 20,
    fontFamily: "Inter, Arial, sans-serif",
    fontWeight: 400,
    fill: "#000",
    baseline: CAPTION_Y + 230,
  },
} as const;
