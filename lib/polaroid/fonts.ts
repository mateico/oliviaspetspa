import { readFileSync } from "fs";
import { join } from "path";

const fontsDir = join(process.cwd(), "lib", "polaroid", "fonts");

const cachedFonts: {
  interRegular?: string;
  interMedium?: string;
  playfairBold?: string;
} = {};

function getFontBase64(filename: string): string {
  const fontPath = join(fontsDir, filename);
  const fontBuffer = readFileSync(fontPath);
  return fontBuffer.toString("base64");
}

export function getFontFaceCss(): string {
  if (!cachedFonts.interRegular) {
    cachedFonts.interRegular = getFontBase64("Inter-Regular.ttf");
    cachedFonts.interMedium = getFontBase64("Inter-Medium.ttf");
    cachedFonts.playfairBold = getFontBase64("PlayfairDisplay-Bold.ttf");
  }

  return `
    @font-face {
        font-family: "Inter";
        src: url("data:font/ttf;base64,${cachedFonts.interRegular}") format("truetype");
        font-weight: 400;
    }
    @font-face {
        font-family: "Inter";
        src: url("data:font/ttf;base64,${cachedFonts.interMedium}") format("truetype");
        font-weight: 500;
    }
    @font-face {
        font-family: "Playfair Display";
        src: url("data:font/ttf;base64,${cachedFonts.playfairBold}") format("truetype");
        font-weight: 700;
    }        
  `;
}
