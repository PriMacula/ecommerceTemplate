import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList/ProductList';
import ProductForm from '../ProductForm/ProductForm';
import styles from './ManageProducts.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/Product/getProducts');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleDelete = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/Product/deleteProduct?id=${productId}`, { method: 'DELETE' });
        setProducts(products.filter((product) => product._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSave = async (product) => {
    if (product._id) {
      try {
        const response = await fetch(`/api/Product/updateProduct?id=${product._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const updatedProduct = await response.json();
        setProducts(products.map((p) => (p._id === updatedProduct.product._id ? updatedProduct.product : p)));
        setEditingProduct(null);
        setIsFormVisible(false);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      try {
        const response = await fetch('/api/Product/addProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const newProduct = await response.json();
        setProducts([...products, newProduct.product]);
        setEditingProduct(null);
        setIsFormVisible(false);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.manageProducts}>
      <div className={styles.topBar}>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.addButton} onClick={() => {
          setEditingProduct(null); // Reset the form for adding a new product
          setIsFormVisible(true);
        }}>
          <FontAwesomeIcon icon={faPlus} /> Add Product
        </button>
      </div>
      <ProductList products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />
      {isFormVisible && (
        <div className={styles.formOverlay}>
          <div className={styles.formContainer}>
            <ProductForm
              initialProduct={editingProduct}
              onSave={handleSave}
              mode={editingProduct ? 'edit' : 'add'} // Pass mode to the form
            />
            <button className={styles.closeButton} onClick={() => setIsFormVisible(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
