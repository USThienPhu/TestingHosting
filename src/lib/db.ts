import { sql } from '@vercel/postgres';

export async function initDB() {
  try {
    // Create the snippets table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS snippets (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        date VARCHAR(50) NOT NULL,
        tapeColor VARCHAR(50) NOT NULL,
        tapeRotation VARCHAR(50) NOT NULL,
        cardRotation VARCHAR(50) NOT NULL,
        likes INT DEFAULT 0,
        hasLiked BOOLEAN DEFAULT false,
        imageUrl TEXT NOT NULL,
        images JSONB NOT NULL
      );
    `;
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
