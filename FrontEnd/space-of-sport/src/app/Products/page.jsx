"use client";

import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import styles from '../../styles/StartPageModule.css'; // Importa los estilos

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4003/api/products');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setIsFormVisible(true);
  };

  const handleSaveProductCreate = async (formData) => {
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('category', formData.category);
      formDataWithImage.append('price', formData.price);

      if (formData.image) {
        formDataWithImage.append('image', formData.image);
      }

      const response = await fetch('http://localhost:4000/api/create', {
        method: 'POST',
        body: formDataWithImage,
      });

      if (response.ok) {
        const createdProduct = await response.json();
        setProducts((prevProducts) => [...prevProducts, createdProduct.product]);
        setIsFormVisible(false);
      } else {
        console.error('Error creating product:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsFormVisible(true);
  };

  const handleSaveProductEdit = async (formData) => {
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('category', formData.category);
      formDataWithImage.append('price', formData.price);

      if (formData.image) {
        formDataWithImage.append('image', formData.image);
      }

      const response = await fetch(`http://localhost:4002/api/edit/${selectedProduct._id}`, {
        method: 'PUT',
        body: formDataWithImage,
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts((prevProducts) => 
          prevProducts.map((product) =>
            product._id === updatedProduct.product._id ? updatedProduct.product : product
          )
        );
        setIsFormVisible(false);
      } else {
        console.error('Error editing product:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4001/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSearchProducts = async (query) => {
    try {
      const response = await fetch(`http://localhost:4003/api/search?query=${query}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Product Management</h1>
      <div className={styles.buttons}>
        <button onClick={handleCreateProduct}>Create New Product</button>
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => handleSearchProducts(e.target.value)}
        />
      </div>

      {isFormVisible ? (
        <ProductForm
          product={selectedProduct}
          onSave={selectedProduct ? handleSaveProductEdit : handleSaveProductCreate}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <ProductTable
          products={products}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
