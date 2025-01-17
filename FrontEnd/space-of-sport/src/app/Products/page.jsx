"use client";  // Esto indica que el componente debe ser tratado como un componente del lado del cliente.

import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/api/products');
      let data = await response.json();
      console.log(data)
      setProducts(data);
    };
    fetchProducts();
  }, []);
  

  const handleCreateProduct = () => {
    setSelectedProduct(null); // No hay producto seleccionado, es un nuevo producto
    setIsFormVisible(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Seleccionar el producto para editar
    setIsFormVisible(true);
  };

  const handleDeleteProduct = async (productId) => {
    await fetch(`http://localhost:4000/api/products/${productId}`, {
      method: 'DELETE',
    });
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleSaveProduct = async (formData) => {
    const formDataWithImage = new FormData();
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('category', formData.category);
    formDataWithImage.append('price', formData.price);
    formDataWithImage.append('image', formData.image);

    const method = selectedProduct ? 'PUT' : 'POST';
    const url = selectedProduct
      ? `http://localhost:4000/api/products/${selectedProduct.id}`
      : 'http://localhost:4000/api/products';

    const response = await fetch(url, {
      method,
      body: formDataWithImage,
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      setProducts((prevProducts) => {
        if (selectedProduct) {
          return prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          );
        } else {
          return [...prevProducts, updatedProduct];
        }
      });
      setIsFormVisible(false);
    }
  };

  return (
    <div>
      <h1>Products Management</h1>
      <button onClick={handleCreateProduct}>Create New Product</button>

      {isFormVisible ? (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
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
