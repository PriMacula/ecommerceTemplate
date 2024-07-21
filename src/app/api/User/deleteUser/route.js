import connectToDatabase from '../../../mongodb';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  try {
    await connectToDatabase();

    const { id } = await request.json();

    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);

    return { status: 500, body: { message: "Failed to delete user" } };
  }
}
