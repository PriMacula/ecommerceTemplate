import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import User from '../../models/User';

export async function POST(req) {
  try {
    const { session } = await validateRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();
    if (!productId || quantity === undefined) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    console.log(`Received productId: ${productId}, quantity: ${quantity}`);

    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingItemIndex = user.cart.findIndex(item => item.id === productId);
    if (existingItemIndex !== -1) {
      await User.updateOne(
        { _id: session.userId, "cart.id": productId },
        { $inc: { "cart.$.quantity": quantity } }
      );
      console.log(`Updated existing item: ${JSON.stringify(user.cart[existingItemIndex])}`);
    } else {
      await User.updateOne(
        { _id: session.userId },
        { $push: { cart: { id: productId, quantity } } }
      );
      console.log(`Added new item: { id: ${productId}, quantity: ${quantity} }`);
    }

    console.log(`Saved user cart: ${JSON.stringify(user.cart)}`);
    return NextResponse.json({ message: "Added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
