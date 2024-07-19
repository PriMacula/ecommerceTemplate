import connectToDatabase from '../../../mongodb';
import Product from '../../../models/Product';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        await connectToDatabase();

        // Extract the ID from the URL query parameters
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // Validate the ID parameter
        if (!id) {
            return NextResponse.json({ message: "ID parameter is required" }, { status: 400 });
        }

        // Parse the incoming JSON body
        const { title, description, price, image, category, inStock, stockLevel } = await request.json();

        // Find and update the product by ID
        const product = await Product.findByIdAndUpdate(
            id,
            { title, description, price, image, category, inStock, stockLevel },
            { new: true, runValidators: true } // Ensure validation is applied
        );

        // Check if the product was found and updated
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        // Return the updated product
        return NextResponse.json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error('Error updating product:', error);
        // Return a detailed error response
        return NextResponse.json({ message: "Failed to update product", error: error.message }, { status: 500 });
    }
}
