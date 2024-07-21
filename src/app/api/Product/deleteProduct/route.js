import connectToDatabase from '../../../mongodb';
import Product from '../../../models/Product';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
    try {
        await connectToDatabase();

        // Get the ID from the URL search parameters
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // If no ID is provided, return an error
        if (!id) {
            return NextResponse.json({ message: "ID parameter is required" }, { status: 400 });
        }

        // Find and delete the product by ID
        const product = await Product.findByIdAndDelete(id);

        // If the product is not found, return an error
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        // Return a success message
        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Error deleting product:', error);

        // Return a plain object with status and body for error case
        return { status: 500, body: { message: "Failed to delete product" } };
    }
}
