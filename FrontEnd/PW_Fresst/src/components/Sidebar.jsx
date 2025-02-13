"use client";
import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="d-flex flex-column vh-100">
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

        <hr className="my-3 text-white-80" />

        {/* Menú de navegación */}
        <div className="d-grid gap-2">
          <button
            onClick={() => setActivePage("users")}
            className="btn btn-outline-light w-100 d-flex align-items-center"
          >
            <i className="bi bi-people me-2"></i> Users
          </button>

          <button
            onClick={() => setActivePage("products")}
            className="btn btn-outline-light w-100 d-flex align-items-center"
          >
            <i className="bi bi-box me-2"></i> Products
          </button>

          <button
            onClick={() => setActivePage("branches")}
            className="btn btn-outline-light w-100 d-flex align-items-center"
          >
            <i className="bi bi-building me-2"></i> Branches
          </button>
        </div>

        <hr className="border-light mt-3" />

        {/* Perfil del usuario */}
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
              <span
                className="bg-white rounded-circle d-inline-block"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundImage: "url('/11787559.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></span>
              <span className="ms-2 d-flex flex-column">
                <span className="fw-bold">Administracion</span>
                <span className="text-white-50" style={{ fontSize: "0.85rem" }}>
                  Admin
                </span>
              </span>
            </a>

            <hr className="border-light mt-3" />

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <Link href="/logout" className="dropdown-item">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{ marginLeft: "250px", transition: "margin-left 0.3s ease-in-out" }}></div>
    </div>
  );
};

export default Sidebar;
