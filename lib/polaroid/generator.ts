import sharp from "sharp";
import { SINGLE_LAYOUT, BEFORE_AFTER_LAYOUT, CANVAS_SIZE } from "./layout";
import { buildCaptionSvg } from "./svg";
import { buildLogoSvg } from "./logo";
import { SingleImageInput, BeforeAfterInput, PolaroidOutput } from "./types";

async function fetchImageAsBuffer(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

export async function generateSinglePolaroid(
  input: SingleImageInput,
): Promise<PolaroidOutput> {
  // Fetch image
  const photoBuffer = await fetchImageAsBuffer(input.photoUrl);

  // Create white canvas
  const whiteCanvas = Buffer.from(
    `<svg width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" fill="white"/>
    </svg>`,
  );

  // Crop and resize photo to 770*770 square (cover, attention crop)
  const croppedPhoto = await sharp(photoBuffer)
    .resize(SINGLE_LAYOUT.photoWidth, SINGLE_LAYOUT.photoHeight, {
      fit: "cover",
      position: "attention",
      withoutEnlargement: false,
    })
    .toBuffer();

  // Build caption SVG
  const captionSvg = buildCaptionSvg({
    shopName: input.shopName,
    heroLine: input.dogName,
    subLine: input.tagline || "",
  });

  // Build logo SVG
  const logoSvg = buildLogoSvg(SINGLE_LAYOUT.logoBadgeRadius * 2);

  // Composite: white canvas -> photo -> logo -> caption
  const pngBuffer = await sharp(whiteCanvas, { density: 150 })
    .composite([
      {
        input: croppedPhoto,
        left: SINGLE_LAYOUT.photoX,
        top: SINGLE_LAYOUT.photoY,
      },
      {
        input: Buffer.from(logoSvg),
        left:
          SINGLE_LAYOUT.photoX +
          SINGLE_LAYOUT.photoWidth -
          SINGLE_LAYOUT.logoBadgeRadius * 2 +
          SINGLE_LAYOUT.logoInset,
        top:
          SINGLE_LAYOUT.photoY +
          SINGLE_LAYOUT.photoHeight -
          SINGLE_LAYOUT.logoBadgeRadius * 2 +
          SINGLE_LAYOUT.logoInset,
      },
      { input: Buffer.from(captionSvg), left: 0, top: CANVAS_SIZE - 260 },
    ])
    .png()
    .toBuffer();

  return {
    pngBuffer,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  };
}

export async function generateBeforeAfterPolaroid(
  input: BeforeAfterInput,
): Promise<PolaroidOutput> {
  // Fetch images
  const beforeBuffer = await fetchImageAsBuffer(input.beforePhotoUrl);
  const afterBuffer = await fetchImageAsBuffer(input.afterPhotoUrl);

  // Create white canvas
  const whiteCanvas = Buffer.from(
    `<svg width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" fill="white"/>
    </svg>`,
  );

  // Crop both to 458x770 (41:69 ratio, cover, attention crop)
  const croppedBefore = await sharp(beforeBuffer)
    .resize(BEFORE_AFTER_LAYOUT.photoWidth, BEFORE_AFTER_LAYOUT.photoHeight, {
      fit: "cover",
      position: "attention",
      withoutEnlargement: false,
    })
    .toBuffer();

  const croppedAfter = await sharp(afterBuffer)
    .resize(BEFORE_AFTER_LAYOUT.photoWidth, BEFORE_AFTER_LAYOUT.photoHeight, {
      fit: "cover",
      position: "attention",
      withoutEnlargement: false,
    })
    .toBuffer();

  // Build caption SVG (special caption for before/after)
  const captionSvg = buildCaptionSvg({
    shopName: input.shopName,
    heroLine: "THE BEFORE & AFTER",
    subLine: input.dogName,
  });

  // Build logo SVG (smaller for before/after)
  const logoSvg = buildLogoSvg(BEFORE_AFTER_LAYOUT.logoBadgeRadius * 2);

  // Composite: white canvas → left photo → right photo → logo → caption
  const pngBuffer = await sharp(whiteCanvas, { density: 150 })
    .composite([
      {
        input: croppedBefore,
        left: BEFORE_AFTER_LAYOUT.leftPhotoX,
        top: BEFORE_AFTER_LAYOUT.photoY,
      },
      {
        input: croppedAfter,
        left: BEFORE_AFTER_LAYOUT.rightPhotoX,
        top: BEFORE_AFTER_LAYOUT.photoY,
      },
      {
        input: Buffer.from(logoSvg),
        left: BEFORE_AFTER_LAYOUT.logoX - BEFORE_AFTER_LAYOUT.logoBadgeRadius,
        top: BEFORE_AFTER_LAYOUT.logoY - BEFORE_AFTER_LAYOUT.logoBadgeRadius,
      },
      {
        input: Buffer.from(captionSvg),
        left: 0,
        top: CANVAS_SIZE - 260, // caption band starts at y=820
      },
    ])
    .png()
    .toBuffer();

  return {
    pngBuffer,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  };
}
