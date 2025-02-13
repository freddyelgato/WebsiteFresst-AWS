"use client"; // Ensures this file runs only on the client
import React, { useEffect, useState } from "react"; // Import React, useEffect, and useState
import Navbar from "../components/Navbar";
import Cookies from "js-cookie"; // Import Cookies to check the user's role
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles

export default function RootLayout({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Get the user's role from cookies
    const userRole = Cookies.get("role");
    setRole(userRole);
  }, []);

  return (
    <html lang="en">
      <body>
        {/* Only show the Navbar if the user is not an admin */}
        <Navbar />
        
        <main>{children}</main>
        
        <footer className="footer">
          <p>© 2025 Space of Sport - All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
