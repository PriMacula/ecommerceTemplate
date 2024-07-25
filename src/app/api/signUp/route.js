import { NextResponse } from 'next/server';
import { lucia } from '@/lib/auth';
import User from '../../models/User';
import connectToDatabase from '../../mongodb';
import crypto from 'crypto';
import { hashPassword } from '../../../utils/utils';

export async function POST(request) {
  const { email, password, name, cart } = await request.json();

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email, accountType: "email" });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }

    const validatedCart = Array.isArray(cart) 
      ? cart.filter(item => item.id && item.quantity > 0) 
      : [];
      console.log('Validated cart:', validatedCart);

    const salt = crypto.randomBytes(128).toString('hex');
    const hashedPassword = await hashPassword(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      salt: salt,
      accountType: "email",
      cart: validatedCart,
    });


    const session = await lucia.createSession(user._id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const headers = new Headers();
    headers.append('Set-Cookie', `${sessionCookie.name}=${sessionCookie.value}; Path=/; HttpOnly`);
    
    return NextResponse.json({ success: true }, { headers });
  } catch (e) {
    console.error("Error during signup:", e);
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
