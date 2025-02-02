import React from "react";
import styles from "../styles/StartPageModule.css";
import Navbar from "../components/Navbar";
import "../css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container px-4 px-lg-5">
        {/* Heading Row */}
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="/image3.jpg" 
              alt="Sport Banner"
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">¡Bienvenido a Space of Sport!</h1>
            <p>Encuentra los mejores productos deportivos en un solo lugar.</p>
            <a className="btn btn-primary btn-lg" href="/products">
              Ver Productos
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card text-white bg-secondary my-5 py-4 text-center">
          <div className="card-body">
            <p className="text-white m-0">
              ¡Aprovecha nuestras ofertas exclusivas y equípate con lo mejor!
            </p>
          </div>
        </div>

        {/* Content Row */}
        <div className="row gx-4 gx-lg-5">
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Explora nuestra tienda</h2>
                <p className="card-text">
                  Descubre una amplia selección de productos para todas tus
                  necesidades deportivas.
                </p>
              </div>
              <div className="card-footer">
                <a className="btn btn-primary btn-sm" href="/products">
                  Más Info
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Tu carrito de compras</h2>
                <p className="card-text">
                  Revisa y gestiona los productos que has agregado a tu carrito.
                </p>
              </div>
              <div className="card-footer">
                <a className="btn btn-primary btn-sm" href="/cart">
                  Ir al Carrito
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Inicia sesión</h2>
                <p className="card-text">
                  Accede a tu cuenta para realizar compras y revisar tu historial.
                </p>
              </div>
              <div className="card-footer">
                <a className="btn btn-primary btn-sm" href="/login">
                  Ir a Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default HomePage;
