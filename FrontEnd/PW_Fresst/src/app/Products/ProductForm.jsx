import React, { useState, useEffect } from 'react';
import styles from '../../styles/StartPageModule.css';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image || null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0] || prev.image,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="image">Image:</label>
        <input type="file" onChange={handleFileChange} className={styles.inputField} />
        {product?.image && (
          <p>Current image: {product.image.name || 'Existing image'}</p>
        )}
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {product ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
