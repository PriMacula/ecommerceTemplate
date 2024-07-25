import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';

export async function GET() {
  try {
    const { session } = await validateRequest();
    if (session) {
      return NextResponse.json({ isLoggedIn: true });
    }
    return NextResponse.json({ isLoggedIn: false });
  } catch (error) {
    console.error("Error checking authentication:", error);
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
