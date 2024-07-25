import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '../../models/User';
import { validateRequest } from '@/lib/auth';

export async function POST() {
  try {
    const { session } = await validateRequest();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.userId; 

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    await User.updateOne(
      { _id: userId },
      { $set: { cart: [] } } 
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
