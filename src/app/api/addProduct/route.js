import connectToDatabase from '../../mongodb';
import Product from '../../models/Product';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectToDatabase();

        // Destructure the incoming JSON body
        const { title, description, price, image, category } = await request.json();

        // Create a new product using Mongoose model
        const product = await Product.create({ title, description, price, image, category });

        // Return a NextResponse with JSON payload
        return NextResponse.json({ message: "Product added successfully", product });
    } catch (error) {
        console.error('Error adding product:', error);

        // Return a plain object with status and body for error case
        return { status: 500, body: { message: "Failed to add product" } };
    }
}
