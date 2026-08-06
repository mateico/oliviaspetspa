import { sql } from "@vercel/postgres";

export async function initDB() {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS dogs (
                id SERIAL PRIMARY KEY,
    title VARCHAR(225) NOT NULL,
    photo_type VARCHAR(50) DEFAULT 'una-imagen',
    photo_title VARCHAR(225),
    image_url VARCHAR(500),
    before_image_url VARCHAR(500),
    after_image_url VARCHAR(500),
    large_image_url VARCHAR(500),
    large_before_image_url VARCHAR(500),
    large_after_image_url VARCHAR(500),
    polaroid_url VARCHAR(500),
    polaroid_generated_at TIMESTAMP,
    client_email VARCHAR(255),
    client_whatsapp VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    console.log("Database initiated");
  } catch (error) {
    console.error("DB init error:", error);
  }
}

export async function getDogs() {
  const result = await sql`SELECT * FROM dogs ORDER BY created_at DESC`;
  return result.rows;
}

export interface AddDogInput {
  title: string;
  photoType: "una-imagen" | "antes-despues";
  photoTitle?: string;
  imageUrl?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  largeImageUrl?: string;
  largeBeforeImageUrl?: string;
  largeAfterImageUrl?: string;
  clientEmail?: string;
  clientWhatsapp?: string;
}

export async function addDog(input: AddDogInput) {
  const result = await sql`
    INSERT INTO dogs (
      title, photo_type, photo_title, image_url, before_image_url, after_image_url,
      large_image_url, large_before_image_url, large_after_image_url,
      client_email, client_whatsapp
    )
    VALUES (
      ${input.title}, ${input.photoType}, ${input.photoTitle || null}, ${input.imageUrl || null},
      ${input.beforeImageUrl || null}, ${input.afterImageUrl || null},
      ${input.largeImageUrl || null}, ${input.largeBeforeImageUrl || null}, ${input.largeAfterImageUrl || null},
      ${input.clientEmail || null}, ${input.clientWhatsapp || null}
    )
    RETURNING *
  `;
  return result.rows[0];
}

export async function deleteDog(id: number) {
  await sql`DELETE FROM dogs WHERE id = ${id}`;
}

export async function getDogById(id: number) {
  const result = await sql`SELECT * FROM dogs WHERE id = ${id}`;
  return result.rows[0];
}

export async function updateDogPolaroidUrl(id: number, url: string) {
  const result = await sql`
    UPDATE dogs
    SET polaroid_url = ${url}, polaroid_generated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
}
