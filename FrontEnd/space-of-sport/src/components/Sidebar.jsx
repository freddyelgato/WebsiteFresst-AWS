"use client";
import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Importamos Bootstrap Icons

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Sidebar */}
      <div
        className="bg-primary text-white p-3 d-flex flex-column"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "250px",
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo + Title */}
        <div className="d-flex align-items-center mb-3">
          <a className="navbar-brand text-white fw-bold me-2" href="#">
            <span className="bg-white text-primary px-2 py-1 rounded">B</span>
          </a>
          <Link href="/" className="navbar-brand text-white fs-5 fw-bold">
            Space of Sport
          </Link>
        </div>

        {/* Divider Line */}
        <hr className="my-3 text-white-80" />

        {/* Menu items */}
        <div className="d-grid gap-2">

          <Link href="/admin" className="btn btn-outline-light w-100 d-flex align-items-center">
            <i className="bi bi-people me-2"></i> Users
          </Link>

          <Link href="/products" className="btn btn-outline-light w-100 d-flex align-items-center">
            <i className="bi bi-box me-2"></i> Products
          </Link>

          {/* Dropdown con mismo estilo */}
          <div className="dropdown">
            <button
              className="btn btn-outline-light w-100 d-flex align-items-center dropdown-toggle"
              type="button"
              id="categoryDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-list-ul me-2"></i> Categories
            </button>
            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
              <li><Link href="/products" className="dropdown-item">All Products</Link></li>
              <li><Link href="/products?category=shirts" className="dropdown-item">Sports Shirts</Link></li>
              <li><Link href="/products?category=pants" className="dropdown-item">Sports Pants</Link></li>
              <li><Link href="/products?category=shorts" className="dropdown-item">Sports Shorts</Link></li>
              <li><Link href="/products?category=socks" className="dropdown-item">Sports Socks</Link></li>
              <li><Link href="/products?category=hats" className="dropdown-item">Sports Hats</Link></li>
              <li><Link href="/products?category=shoes" className="dropdown-item">Sports Shoes</Link></li>
            </ul>
          </div>

          <Link href="/listClient" className="btn btn-outline-light w-100 d-flex align-items-center">
            <i className="bi bi-cart me-2"></i> Clientes
          </Link>

        </div>

        <hr className="border-light mt-3" />
        {/* User Profile Dropdown */}
        <div className="mt-auto">
          <div className="dropdown">
            <a
              className="navbar-brand text-white fw-bold d-flex align-items-center dropdown-toggle"
              href="#"
              role="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >

              {/* Avatar */}

              <span
                className="bg-white rounded-circle d-inline-block"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundImage:
                    "url('/11787559.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></span>


              {/* User Info */}
              <span className="ms-2 d-flex flex-column">
                <span className="fw-bold">Administracion</span>
                <span className="text-white-50" style={{ fontSize: "0.85rem" }}>
                  Admin
                </span>
              </span>
            </a>

            <hr className="border-light mt-3" />

            {/* Dropdown Menu */}
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><Link href="/logout" className="dropdown-item">Logout</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className="container-fluid"
        style={{
          marginLeft: "250px",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
