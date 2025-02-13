// src/app/index.jsx
import React from 'react';
import styles from '../styles/StartPageModule.css';

const HomePage = () => {
  return (
    <div>
      {/* Main Content */}
      <main className={styles.main}>
       
        <h1>Welcome to Space of Sport!</h1>
        <p>Find the best sports products all in one place.</p>
        <div className={styles.buttons}>
          <a href="/products" className={styles.btn}>
            View Products
          </a>
          <a href="/cart" className={styles.btn}>
            Go to Cart
          </a>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
