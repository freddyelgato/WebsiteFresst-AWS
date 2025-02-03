"use client";

import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Obtener todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4003/api/products'); // Microservicio de ProductSearch en el puerto 4003
        const data = await response.json();
        setProducts(data.products || []); // Asegura que recibas los productos
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Crear un producto
  const handleCreateProduct = () => {
    setSelectedProduct(null); // Sin producto seleccionado
    setIsFormVisible(true);   // Mostrar el formulario
  };

  // Función para crear producto
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

  // Editar un producto
  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Selecciona el producto para editar
    setIsFormVisible(true);      // Mostrar el formulario
  };

  // Función para editar producto
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

  // Eliminar un producto
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4001/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId)); // Elimina el producto
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Buscar productos
  const handleSearchProducts = async (query) => {
    try {
      const response = await fetch(`http://localhost:4003/api/search?query=${query}`);
      const data = await response.json();
      setProducts(data.products || []); // Actualiza la lista de productos con los resultados filtrados
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div>
      <h1>Products Management</h1>
      <button onClick={handleCreateProduct}>Create New Product</button>

      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => handleSearchProducts(e.target.value)}
      />

      {isFormVisible ? (
        <ProductForm
          product={selectedProduct}
          onSave={selectedProduct ? handleSaveProductEdit : handleSaveProductCreate} // Decide qué función usar
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
