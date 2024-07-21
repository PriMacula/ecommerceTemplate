// models/Product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  stockLevel: { type: Number, default: 0 },
  // Add more fields as needed
});

const Product = mongoose.models.Product  || mongoose.model('Product', productSchema);

export default Product;
