// src/app/admin/components/ProductForm/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import styles from './ProductForm.module.css';

const ProductForm = ({ initialProduct, onSave, mode }) => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    inStock: true,
    stockLevel: 0
  });

  useEffect(() => {
    if (initialProduct) {
      setProduct({
        _id: initialProduct._id || '', // Add _id to the product state
        title: initialProduct.title || '',
        description: initialProduct.description || '',
        price: initialProduct.price || '',
        image: initialProduct.image || '',
        category: initialProduct.category || '',
        inStock: initialProduct.inStock !== undefined ? initialProduct.inStock : true,
        stockLevel: initialProduct.stockLevel || 0
      });
    } else {
      setProduct({
        title: '',
        description: '',
        price: '',
        image: '',
        category: '',
        inStock: true,
        stockLevel: 0
      });
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = mode === 'edit' ? 'PUT' : 'POST'; // Use PUT for updates, POST for new products
    const url = mode === 'edit' ? `/api/Product/updateProduct?id=${product._id}` : '/api/Product/addProduct';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        const data = await response.json();
        if (response.ok) {
            onSave(data.product);
        } else {
            console.error('Failed to save product:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <form className={styles.productForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="title">Title</label>
        <input
          className={styles.formInput}
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="description">Description</label>
        <textarea
          className={styles.formInput}
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="price">Price</label>
        <input
          className={styles.formInput}
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="image">Image URL</label>
        <input
          className={styles.formInput}
          type="text"
          id="image"
          name="image"
          value={product.image}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="category">Category</label>
        <input
          className={styles.formInput}
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="inStock">In Stock</label>
        <input
          className={styles.formInput}
          type="checkbox"
          id="inStock"
          name="inStock"
          checked={product.inStock}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="stockLevel">Stock Level</label>
        <input
          className={styles.formInput}
          type="number"
          id="stockLevel"
          name="stockLevel"
          value={product.stockLevel}
          onChange={handleChange}
        />
      </div>
      <button className={styles.saveButton} type="submit">{mode === 'edit' ? 'Update' : 'Save'}</button>
    </form>
  );
};

export default ProductForm;
