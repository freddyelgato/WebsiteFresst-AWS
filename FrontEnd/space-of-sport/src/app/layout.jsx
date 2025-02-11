"use client"; // Asegura que este archivo se ejecute solo en el cliente
import React, { useEffect, useState } from "react"; // Importar React, useEffect y useState
import Navbar from "../components/Navbar";
import Cookies from "js-cookie"; // Importar Cookies para verificar el rol del usuario
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap

export default function RootLayout({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Obtener el rol del usuario desde las cookies
    const userRole = Cookies.get("role");
    setRole(userRole);
  }, []);

  return (
    <html lang="en">
      <body>
        {/* Solo mostrar el Navbar si el usuario no es admin */}
        <Navbar />
        
        <main>{children}</main>
        
        <footer className="footer">
          <p>© 2025 Space of Sport - Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
