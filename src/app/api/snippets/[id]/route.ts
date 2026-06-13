import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { images } = body;

    if (!images || !Array.isArray(images)) {
      return NextResponse.json({ error: 'Images array is required' }, { status: 400 });
    }

    const result = await sql`
      UPDATE snippets
      SET images = ${JSON.stringify(images)}::jsonb,
          imageUrl = ${images[0]}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error updating snippet images:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const result = await sql`
      DELETE FROM snippets
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error: any) {
    console.error('Error deleting snippet:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
