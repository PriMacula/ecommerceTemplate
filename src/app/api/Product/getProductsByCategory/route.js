// src/app/api/getProductsByCategory/route.js
import connectToDatabase from '../../../mongodb';
import Product from '../../../models/Product';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    try {
        await connectToDatabase(); // Establish MongoDB connection

        if (!category) {
            return NextResponse.json({ error: 'Category parameter is required.' }, { status: 400 });
        }

        const products = await Product.find({ category }); // Fetch products filtered by category
        return NextResponse.json({ products }); // Return JSON response with products
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 }); // Handle error with appropriate response
    }
}
