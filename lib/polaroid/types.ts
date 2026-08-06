export interface SingleImageInput {
  photoUrl: string;
  shopName: string;
  dogName: string;
  tagline?: string; // optional
  logoSvg: string;
}

export interface BeforeAfterInput {
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  shopName: string;
  dogName: string;
  logoSvg: string;
}

export interface PolaroidOutput {
  pngBuffer: Buffer;
  width: number;
  height: number;
}
