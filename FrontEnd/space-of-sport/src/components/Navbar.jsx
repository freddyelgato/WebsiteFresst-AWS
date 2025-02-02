"use client";
import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand text-white fw-bold" href="#">
          <span className="bg-white text-primary px-2 py-1 rounded">B</span>
        </a>
        <Link href="/" className="navbar-brand">
          Space of Sport
        </Link>

        {/* Botón de menú responsivo */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link">
                Products
              </Link>
            </li>

            {/* Lista Desplegable */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link href="/products" className="dropdown-item">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=shirts" className="dropdown-item">
                    Sports Shirts
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=pants" className="dropdown-item">
                    Sports Pants
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=shorts" className="dropdown-item">
                    Sports Shorts
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=socks" className="dropdown-item">
                    Sports Socks
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=hats" className="dropdown-item">
                    Sports Hats
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=shoes" className="dropdown-item">
                    Sports Shoes
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/Cart" className="nav-link">
                Cart
              </Link>
            </li>
          </ul>

          {/* Barra de búsqueda centrada */}
          <form className="d-flex mx-auto" style={{ width: "20%", backgroundColor: "rgba(0, 123, 255, 0.2)", border: "2px solid #007bff", borderRadius: "5px" }}>
              <input
                className="form-control text-center"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
         </form>


          {/* Botón de Login alineado a la derecha */}
          <div className="ms-auto">
            <a href="/login" className="btn btn-outline-light">Login</a>
            <a href="/register" className="btn btn-outline-light">Register</a>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;