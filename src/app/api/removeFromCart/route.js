import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import User from '../../models/User';

export async function POST(request) {
  try {
    const { productId } = await request.json();
    const { session } = await validateRequest();

    if (session) {
      await removeCartItem(session.userId, productId);
      console.log('Item removed from cart');
      return NextResponse.json({ message: 'Item removed from cart' });
    } else {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
const removeCartItem = async (userId, productId) => {
  try {
    await User.updateOne(
      { _id: userId },
      { $pull: { cart: { id: productId } } } 
    );
    console.log('Item removed from cart in the database');
  } catch (error) {
    console.error('Error removing item from cart in database:', error);
    throw error;
  }
};
