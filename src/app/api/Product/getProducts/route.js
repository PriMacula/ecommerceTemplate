import connectToDatabase from '../../../mongodb';
import Product from '../../../models/Product';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDatabase(); // Establish MongoDB connection

        const products = await Product.find(); // Fetch products from MongoDB
        return NextResponse.json({ products }); // Return JSON response with products
    } catch (error) {
        console.error('Error fetching products:', error);
        return { status: 500, body: { message: 'Failed to fetch products' } }; // Handle error with appropriate response
    }
}
