"use client";
import React, { useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarUser = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle state to open/close the menu
    };

    const handleLogout = () => {
        // Logic to handle logout (for example, removing cookies and redirecting)
        window.location.href = '/login'; // Redirect to the login page
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

                {/* Responsive menu button */}
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

                {/* Navbar content */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/login" className="nav-link active">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/products" className="nav-link">
                                Products
                            </Link>
                        </li>

                        {/* Dropdown list */}
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
                                {/* Other categories */}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link href="/Form" className="nav-link">
                                Form
                            </Link>
                        </li>
                    </ul>

                    {/* Centered search bar */}
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

                    {/* Display only the profile picture circle */}
                    <ul className="nav navbar-nav ml-md-auto">
                        <li className="dropdown">
                            {/* Activation button */}
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
                                            "url('/6897018.png')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                ></span>

                                {/* User Info */}
                                <span className="ms-2 d-flex flex-column">
                                    <span className="fw-bold" style={{ fontSize: "0.9rem" }}>User</span>
                                    <span className="text-white-50" style={{ fontSize: "0.75rem" }}>User</span>
                                </span>

                            </a>

                            {/* Dropdown menu */}
                            <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="navbarDropdown">
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
