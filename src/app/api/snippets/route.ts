import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

const INITIAL_ENTRIES = [
  {
    title: "Morning sketches - Day 42",
    category: "Sketches",
    description: "A vibrant, messy artist's desk filled with watercolor palettes, scattered brushes, and a half-finished illustration on thick textured paper. Morning sunlight casting soft shadows.",
    date: "Jun 5, 2026",
    tapeColor: "tape-coral",
    tapeRotation: "-rotate-12",
    cardRotation: "rotate-2",
    likes: 12,
    hasLiked: false,
    imageUrl: "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/ptb2.jpg",
    images: JSON.stringify([
      "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/ptb2.jpg",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=60"
    ])
  },
  {
    title: "Cafe inspiration",
    category: "Sketches",
    description: "Hands holding a thick worn sketchbook filled with intricate black ink doodle art. The setting is bright and airy in a minimalist cafe workspace, focusing on tactile analog drawing.",
    date: "Jun 3, 2026",
    tapeColor: "tape-yellow",
    tapeRotation: "rotate-6",
    cardRotation: "-rotate-1",
    likes: 24,
    hasLiked: false,
    imageUrl: "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/z6344277640904_e15bb3bfd59b930157923c6992070a46.jpg",
    images: JSON.stringify([
      "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/z6344277640904_e15bb3bfd59b930157923c6992070a46.jpg",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop&q=60"
    ])
  },
  {
    title: "Analog Photobooth strip",
    category: "Photos",
    description: "Nostalgic film photobooth strip lying next to pencils. Capturing happy smiles, fun poses, and vintage memories with friends. Pure organic scrapbook vibe.",
    date: "May 28, 2026",
    tapeColor: "tape-green",
    tapeRotation: "rotate-[35deg]",
    cardRotation: "rotate-3",
    likes: 42,
    hasLiked: true,
    imageUrl: "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/ptb3.jpg",
    images: JSON.stringify([
      "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/ptb3.jpg",
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=60"
    ])
  },
  {
    title: "Stationery tape collection",
    category: "Crafts",
    description: "A colorful collection of washi tape rolls stacked on a desk. Patterns include stripes, polka dots, and floral motifs - essential tools for decorating scrapbooks.",
    date: "May 25, 2026",
    tapeColor: "tape-blue",
    tapeRotation: "-rotate-6",
    cardRotation: "-rotate-2",
    likes: 9,
    hasLiked: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-5ERtKKJTV-Dw5KQMCYuxU4y2BIgAqEdhhdt0J-huYAIXJVKscNrCBwNLCipCMbZ9C-wj6eoIhUg1kAlynNI1ZZNVV62Fw-19R4b2gOlfKRr_Wu78JGhLaCp3VxnDxNsTShQgXOrJE71HvlA1MHi0qe6ejPLR5RB0OE7UppmuUuvJrRo1_HtdwbyJ82BEz-fHibGsnNhNaGxsr0FnAwM68ZutjjbW7fnTsigWGiGizTYpwWjQ07OXtcoI4b_gG5bOHcIkY8k36Q",
    images: JSON.stringify([
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-5ERtKKJTV-Dw5KQMCYuxU4y2BIgAqEdhhdt0J-huYAIXJVKscNrCBwNLCipCMbZ9C-wj6eoIhUg1kAlynNI1ZZNVV62Fw-19R4b2gOlfKRr_Wu78JGhLaCp3VxnDxNsTShQgXOrJE71HvlA1MHi0qe6ejPLR5RB0OE7UppmuUuvJrRo1_HtdwbyJ82BEz-fHibGsnNhNaGxsr0FnAwM68ZutjjbW7fnTsigWGiGizTYpwWjQ07OXtcoI4b_gG5bOHcIkY8k36Q",
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?w=600&auto=format&fit=crop&q=60"
    ])
  },
  {
    title: "Pastel watercolor wash",
    category: "Painting",
    description: "Abstract watercolor painting in soft pastel green, blue, and yellow hues bleeding organically into thick textured cold press paper. Handcrafted art.",
    date: "May 19, 2026",
    tapeColor: "tape-coral",
    tapeRotation: "rotate-12",
    cardRotation: "rotate-1",
    likes: 18,
    hasLiked: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATLehqdJ1G0_37t8DVpzbb5ggCKkrwgr6uRENCvOkju2BppCXfx48JyK2v9cvdLJagN_PE7w_qMRjnatyasHfZOMQMxxPHFOXHWPPhDpNQIZIUEchVvz_GR6pVjoIHAWd1jC864Bb7cJhHtxuHTdwSaWRzVwryj_y3FO3Ay7VG5YTuPEBHZizuFI6jhkfyJ6Um2Mn9wrt13gePs00YDvpnut3J140v6-uPlasQ2n6tRi16VV_C7AOTJycvEELBsMQRBw1wSltPeA",
    images: JSON.stringify([
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATLehqdJ1G0_37t8DVpzbb5ggCKkrwgr6uRENCvOkju2BppCXfx48JyK2v9cvdLJagN_PE7w_qMRjnatyasHfZOMQMxxPHFOXHWPPhDpNQIZIUEchVvz_GR6pVjoIHAWd1jC864Bb7cJhHtxuHTdwSaWRzVwryj_y3FO3Ay7VG5YTuPEBHZizuFI6jhkfyJ6Um2Mn9wrt13gePs00YDvpnut3J140v6-uPlasQ2n6tRi16VV_C7AOTJycvEELBsMQRBw1wSltPeA",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60"
    ])
  },
  {
    title: "Analog memory keep",
    category: "Photos",
    description: "A vintage film camera lying next to scattered physical polaroid photos on a wooden table. Nostalgic storytelling at its best.",
    date: "May 10, 2026",
    tapeColor: "tape-yellow",
    tapeRotation: "-rotate-12",
    cardRotation: "-rotate-3",
    likes: 35,
    hasLiked: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqJJ-RvLmVAHAEFX6hUR2GqYz1MrH4p27cA0htH6FW3XvLvt7Hri43kBSev-ocE3m7WlSwiT9MWUPNOGlhjS2_KeH2GNjRZ1sm88KWVY88bLGQ8RsDq27D2IhWuvLd5JnFYL6y_dmZ0lERHJTg8QHZucLmMxCYVNosjwBHQcoFNvVRkSY_Eb-mfn3FAJE-S6tAMt9pXmmzY-bfE8bNlxyi9iDrDv-GS3Ty3OdH8pbnDriQ_xLy1jWptDcY0DQKaLTtFEhNAdp8dg",
    images: JSON.stringify([
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqJJ-RvLmVAHAEFX6hUR2GqYz1MrH4p27cA0htH6FW3XvLvt7Hri43kBSev-ocE3m7WlSwiT9MWUPNOGlhjS2_KeH2GNjRZ1sm88KWVY88bLGQ8RsDq27D2IhWuvLd5JnFYL6y_dmZ0lERHJTg8QHZucLmMxCYVNosjwBHQcoFNvVRkSY_Eb-mfn3FAJE-S6tAMt9pXmmzY-bfE8bNlxyi9iDrDv-GS3Ty3OdH8pbnDriQ_xLy1jWptDcY0DQKaLTtFEhNAdp8dg",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=60"
    ])
  },
  {
    title: "Pressed Garden Flowers",
    category: "Crafts",
    description: "Delicate dried pressed flowers arranged beautifully on a warm tea-stained vintage notebook page, with hand-written thoughts and cute tiny tape decorations.",
    date: "May 8, 2026",
    tapeColor: "tape-coral",
    tapeRotation: "rotate-6",
    cardRotation: "rotate-2",
    likes: 15,
    hasLiked: false,
    imageUrl: "/scrapbook_flowers.png",
    images: JSON.stringify([
      "/scrapbook_flowers.png",
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60"
    ])
  },
  {
    title: "Vibrant Watercolor Wash",
    category: "Painting",
    description: "A cozy studio desk setup showing a messy watercolor paint palette, wet brushes, and organic color gradients bleeding into thick textured artist paper.",
    date: "May 5, 2026",
    tapeColor: "tape-green",
    tapeRotation: "-rotate-12",
    cardRotation: "-rotate-2",
    likes: 27,
    hasLiked: false,
    imageUrl: "/watercolor_palette.png",
    images: JSON.stringify([
      "/watercolor_palette.png",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=60"
    ])
  },
  {
    title: "Seaside Travel Memories",
    category: "Photos",
    description: "Physical Polaroid snaps from past adventures layout on a rustic blue wooden background, featuring beautiful sunny shorelines and coconut palm tree shadows.",
    date: "May 1, 2026",
    tapeColor: "tape-yellow",
    tapeRotation: "rotate-[15deg]",
    cardRotation: "rotate-1",
    likes: 39,
    hasLiked: false,
    imageUrl: "/travel_polaroids.png",
    images: JSON.stringify([
      "/travel_polaroids.png",
      "https://images.unsplash.com/photo-1473116763269-255ea7607cbe?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&auto=format&fit=crop&q=60"
    ])
  }
];

export async function GET() {
  try {
    // Initialize DB if needed
    await initDB();

    // Check if table is empty
    const { rows: countRows } = await sql`SELECT COUNT(*) FROM snippets`;
    
    if (parseInt(countRows[0].count, 10) === 0) {
      // Seed data
      for (const entry of INITIAL_ENTRIES) {
        await sql`
          INSERT INTO snippets (title, category, description, date, tapeColor, tapeRotation, cardRotation, likes, hasLiked, imageUrl, images)
          VALUES (${entry.title}, ${entry.category}, ${entry.description}, ${entry.date}, ${entry.tapeColor}, ${entry.tapeRotation}, ${entry.cardRotation}, ${entry.likes}, ${entry.hasLiked}, ${entry.imageUrl}, ${entry.images}::jsonb)
        `;
      }
    }

    const { rows } = await sql`SELECT * FROM snippets ORDER BY id ASC`;
    
    // Postgres returns lowercase column names for unquoted columns.
    // We map them back to camelCase to match the frontend GalleryEntry interface.
    const formattedRows = rows.map(row => ({
      id: row.id,
      title: row.title,
      category: row.category,
      description: row.description,
      date: row.date,
      tapeColor: row.tapecolor,
      tapeRotation: row.taperotation,
      cardRotation: row.cardrotation,
      likes: row.likes,
      hasLiked: row.hasliked,
      imageUrl: row.imageurl,
      images: row.images
    }));

    return NextResponse.json(formattedRows);
  } catch (error: any) {
    console.error('Error fetching snippets:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, description, tapeColor, tapeRotation, cardRotation, imageUrl, images } = body;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const result = await sql`
      INSERT INTO snippets (title, category, description, date, tapeColor, tapeRotation, cardRotation, imageUrl, images)
      VALUES (${title}, ${category}, ${description}, ${date}, ${tapeColor}, ${tapeRotation}, ${cardRotation}, ${imageUrl}, ${JSON.stringify(images)}::jsonb)
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error creating snippet:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
