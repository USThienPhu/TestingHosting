import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { hasLiked } = body;

    if (typeof hasLiked !== 'boolean') {
      return NextResponse.json({ error: 'hasLiked boolean is required' }, { status: 400 });
    }

    // if hasLiked is true, we increment likes, otherwise decrement
    const result = await sql`
      UPDATE snippets
      SET hasLiked = ${hasLiked},
          likes = likes + ${hasLiked ? 1 : -1}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error updating snippet likes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
