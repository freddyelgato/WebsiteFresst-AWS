// layout.jsx

"use client"; // Asegura que este archivo se ejecute solo en el cliente
import React, { useEffect } from "react"; // Importar React y useEffect
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap

// Componente funcional RootLayout donde se usa useEffect
export default function RootLayout({ children }) {
  // Cargar Bootstrap JS solo en el cliente con useEffect
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <html lang="en">
      <body>

        <main>{children}</main>
        <footer className="py-5 bg-dark">
            <div className="container px-4 px-lg-5"><p className="m-0 text-center text-white">Copyright &copy; 2025 Space of Sport - Todos los derechos reservados.</p></div>
        </footer>
 
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
       
        <script src="js/scripts.js"></script>
      </body>
    </html>
  );
}
