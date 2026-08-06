import { CAPTION_LAYOUT, CANVAS_SIZE } from "./layout";
import { getFontFaceCss } from "./fonts";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function estimateTextWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.6;
}

function fitFontSize(
  text: string,
  maxWidth: number,
  baseFontSize: number,
): number {
  let fontSize = baseFontSize;
  while (fontSize > 12 && estimateTextWidth(text, fontSize) > maxWidth) {
    fontSize -= 2;
  }
  return fontSize;
}

function truncateToWidth(
  text: string,
  maxWidth: number,
  fontSize: number,
): string {
  const ellipsis = "…";
  let truncated = text;
  while (
    truncated.length > 0 &&
    estimateTextWidth(truncated + ellipsis, fontSize) > maxWidth
  ) {
    truncated = truncated.slice(0, -1);
  }
  return truncated + (truncated !== text ? ellipsis : "");
}

export interface CaptionSvgInput {
  shopName: string;
  heroLine: string;
  subLine?: string; // optional
}

export function buildCaptionSvg(input: CaptionSvgInput): string {
  const { shopName, heroLine, subLine } = input;

  // Escape all text to prevent XML injection
  const safeShopName = escapeXml(shopName);
  const safeHeroLine = escapeXml(heroLine);
  const safeSubLine = subLine ? escapeXml(subLine) : "";

  // Calculate available text width
  const availableTextWidth =
    CANVAS_SIZE - CAPTION_LAYOUT.leftMargin - CAPTION_LAYOUT.rightMargin;

  // Fit font sizes
  const heroFontSize = fitFontSize(
    safeHeroLine,
    availableTextWidth,
    CAPTION_LAYOUT.heroLine.fontSize,
  );

  const subFontSize = fitFontSize(
    safeSubLine,
    availableTextWidth,
    CAPTION_LAYOUT.subLine.fontSize,
  );

  // Truncate if needed
  const truncatedHeroLine = truncateToWidth(
    safeHeroLine,
    availableTextWidth,
    heroFontSize,
  );

  const truncatedSubLine = truncateToWidth(
    safeSubLine,
    availableTextWidth,
    subFontSize,
  );

  // Build SVG
  return `
    <svg width="${CANVAS_SIZE}" height="${CAPTION_LAYOUT.height}" viewBox="0 0 ${CANVAS_SIZE} ${CAPTION_LAYOUT.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          ${getFontFaceCss()}
        </style>
      </defs>
      <rect width="${CANVAS_SIZE}" height="${CAPTION_LAYOUT.height}" fill="white"/>
      <text x="${CANVAS_SIZE / 2}" y="${CAPTION_LAYOUT.shopName.baseline}" text-anchor="middle" font-family="${CAPTION_LAYOUT.shopName.fontFamily}" font-size="${CAPTION_LAYOUT.shopName.fontSize}" font-weight="${CAPTION_LAYOUT.shopName.fontWeight}" letter-spacing="${CAPTION_LAYOUT.shopName.letterSpacing}" fill="${CAPTION_LAYOUT.shopName.fill}" text-transform="uppercase">
        ${safeShopName}
      </text>
      <text x="${CANVAS_SIZE / 2}" y="${CAPTION_LAYOUT.heroLine.baseline}" text-anchor="middle" font-family="${CAPTION_LAYOUT.heroLine.fontFamily}" font-size="${heroFontSize}" font-weight="${CAPTION_LAYOUT.heroLine.fontWeight}" fill="${CAPTION_LAYOUT.heroLine.fill}">
        ${truncatedHeroLine}
      </text>
      ${
        truncatedSubLine
          ? `<text x="${CANVAS_SIZE / 2}" y="${CAPTION_LAYOUT.subLine.baseline}" text-anchor="middle" font-family="${CAPTION_LAYOUT.subLine.fontFamily}" font-size="${subFontSize}" font-weight="${CAPTION_LAYOUT.subLine.fontWeight}" fill="${CAPTION_LAYOUT.subLine.fill}">
        ${truncatedSubLine}
      </text>`
          : ""
      }
    </svg>
  `;
}
