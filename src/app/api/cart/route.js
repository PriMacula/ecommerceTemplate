import { validateRequest } from '@/lib/auth';
import User from '../../models/User';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { session } = await validateRequest(req);
    console.log("Session data:", session);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.userId;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ cart: user.cart }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
