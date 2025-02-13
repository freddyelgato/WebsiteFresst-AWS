import React from 'react';
import ProductActions from './ProductActions';
import styles from '../../styles/StartPageModule.css';  // Asegúrate de importar los estilos

const ProductTable = ({ products, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td><img src={product.imageUrl} alt={product.name} width="50" /></td>
              <td>
                <ProductActions product={product} onDelete={onDelete} onEdit={onEdit} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
