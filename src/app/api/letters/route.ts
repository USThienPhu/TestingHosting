import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';

export async function GET() {
  try {
    await initDB();
    const result = await sql`
      SELECT * FROM letters
      ORDER BY created_at DESC;
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch letters:', error);
    return NextResponse.json({ error: 'Failed to fetch letters' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO letters (content)
      VALUES (${content})
      RETURNING *;
    `;
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Failed to create letter:', error);
    return NextResponse.json({ error: 'Failed to create letter' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contentMatch = searchParams.get('contentMatch');
    if (!contentMatch) {
      return NextResponse.json({ error: 'contentMatch is required' }, { status: 400 });
    }

    const result = await sql`
      DELETE FROM letters
      WHERE content LIKE ${'%' + contentMatch + '%'}
      RETURNING *;
    `;
    return NextResponse.json({ deleted: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete letter:', error);
    return NextResponse.json({ error: 'Failed to delete letter' }, { status: 500 });
  }
}
