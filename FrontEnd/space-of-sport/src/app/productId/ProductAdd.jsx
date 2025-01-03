//Detalles de los productos por ID
import React, { useState } from 'react';

function ProductAdd() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('image', product.image);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('Producto agregado:', data);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductAdd;
