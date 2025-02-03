"use client";

import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import styles from '../../styles/StartPageModule.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4003/api/products');
        const data = await response.json();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);

        const uniqueCategories = [...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setIsFormVisible(true);
  };

  const handleSaveProduct = async (formData, isEdit = false) => {
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('category', formData.category);
      formDataWithImage.append('price', formData.price);

      if (formData.image) {
        formDataWithImage.append('image', formData.image);
      }

      const url = isEdit
        ? `http://localhost:4002/api/edit/${selectedProduct._id}`
        : 'http://localhost:4000/api/create';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataWithImage,
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(prevProducts =>
          isEdit
            ? prevProducts.map(product =>
                product._id === updatedProduct.product._id ? updatedProduct.product : product
              )
            : [...prevProducts, updatedProduct.product]
        );
        setIsFormVisible(false);
      } else {
        console.error('Error saving product:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsFormVisible(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4001/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>📦 Product Management</h1>
      <div className={styles.buttons}>
        <button onClick={handleCreateProduct}>Create New Product</button>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">📂 All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {isFormVisible ? (
        <ProductForm
          product={selectedProduct}
          onSave={(formData) => handleSaveProduct(formData, !!selectedProduct)}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <ProductTable
          products={filteredProducts}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
