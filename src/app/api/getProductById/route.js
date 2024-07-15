// src/app/api/getProductById/route.js
import connectToDatabase from '../../mongodb';
import Product from '../../models/Product';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        await connectToDatabase(); // Establish MongoDB connection

        if (!id) {
            return NextResponse.json({ error: 'ID parameter is required.' }, { status: 400 });
        }

        const product = await Product.findById(id); // Fetch product by ID
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ product }); // Return JSON response with the product
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 }); // Handle error with appropriate response
    }
}
