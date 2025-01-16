"use client"; // Asegura que este archivo se ejecute solo en el cliente
import React, { useState, useEffect } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Obtener la categoría de la URL (parámetro de búsqueda)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    setCategory(categoryParam || "");

    // Obtener los productos de la base de datos (puedes modificar la ruta si es necesario)
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (categoryParam) {
          setProducts(data.filter((product) => product.category === categoryParam));
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [category]);

  return (
    <div>
      <h1>Products {category && ` - ${category}`}</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card">
              <img
                src={`http://localhost:5000/uploads/${product.image}`} // Ajusta la ruta de la imagen según tu configuración
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
