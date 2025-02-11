import React, { useState, useEffect } from 'react';
import styles from '../../styles/StartPageModule.css';

const BranchForm = ({ branch, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    email: '',
    mobilePhone: '',
    landlinePhone: '',
  });

  useEffect(() => {
    if (branch) {
      setFormData({
        name: branch.name,
        address: branch.address,
        city: branch.city,
        email: branch.email,
        mobilePhone: branch.mobilePhone,
        landlinePhone: branch.landlinePhone,
      });
    }
  }, [branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Branch Name:</label>
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
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="mobilePhone">Mobile Phone:</label>
        <input
          type="text"
          name="mobilePhone"
          value={formData.mobilePhone}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="landlinePhone">Landline Phone:</label>
        <input
          type="text"
          name="landlinePhone"
          value={formData.landlinePhone}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {branch ? 'Update Branch' : 'Create Branch'}
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BranchForm;
