"use client";
import React, { useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarUser = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Cambiar estado para abrir/cerrar el menú
    };

    const handleLogout = () => {
        // Lógica para manejar el logout (por ejemplo, eliminar las cookies y redirigir)
        window.location.href = '/login'; // Redirigir a la página de login
    };

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
                                {/* Otras categorías */}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link href="/Cart" className="nav-link">
                                Cart
                            </Link>
                        </li>
                    </ul>

                    {/* Barra de búsqueda centrada */}
                    <form
                        className="d-flex mx-auto"
                        style={{
                            width: "20%",
                            backgroundColor: "rgba(0, 123, 255, 0.2)",
                            border: "2px solid #007bff",
                            borderRadius: "5px",
                        }}
                    >
                        <input
                            className="form-control text-center"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </form>

                    {/* Mostrar solo el círculo de la foto de perfil */}
                    <ul className="nav navbar-nav ml-md-auto">
                        <li className="dropdown">
                            {/* Botón de activación */}
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen ? "true" : "false"}

                            >
                                Welcome, User <b className="caret"></b>
                            </a>

                            {/* Menú desplegable */}
                            <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Edit profile</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/logout">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser;
