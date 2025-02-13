"use client";

import { useState } from "react";
import axios from "axios";
import NavbarUser from "../../components/NavbarUser";
import { useRouter } from "next/navigation"; // Para la redirección al hacer clic en el botón "Back"

export default function ClientForm() {
  const [client, setClient] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    ciudad: "",
    direccion: "",
  });

  const router = useRouter(); // Usamos useRouter para redirigir
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar solicitud POST a tu backend
      const response = await axios.post("http://localhost:3005/api/clients", client);
      alert("Cliente registrado correctamente");
      setClient({
        nombre: "",
        apellido: "",
        cedula: "",
        telefono: "",
        ciudad: "",
        direccion: "",
      });
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      alert("Hubo un problema al registrar el cliente");
    }
  };

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  return (
    
    <div 
      className="container-fluid m-0 p-0" 
      style={{ background: "linear-gradient(45deg, #ffffff, #f2f2f2)", minHeight: "100vh" }}
      
    >
        <NavbarUser />
      <div className="container mt-4">
        <div className="card shadow-lg p-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 className="mb-4 text-center">Formulario</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={client.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                value={client.apellido}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cédula</label>
              <input
                type="text"
                className="form-control"
                name="cedula"
                value={client.cedula}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={client.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ciudad</label>
              <input
                type="text"
                className="form-control"
                name="ciudad"
                value={client.ciudad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={client.direccion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary me-2">Enviar</button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => router.back()} // Redirige a la página anterior
              >
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
