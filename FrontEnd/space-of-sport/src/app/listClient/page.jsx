"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { searchUserById, searchUserByName } from "@/utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";


export default function ListClients() {
    const [clients, setClients] = useState([]);
    const [filteredUser, setFilteredUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cedula, setCedula] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get(`http://localhost:3006/api/clients`);
            setClients(response.data);
        } catch (error) {
            console.error("Error al obtener Cliente:", error);
        }
    };
    const handleSearch = async () => {
        if (!input.trim()) {
            setResult([]);  // Si el input está vacío, reseteamos los resultados
            fetchClients();  // Recargamos la lista de todos los usuarios
            return;
        }

        let result = [];
        // Aseguramos que el input sea un número para la búsqueda por ID
        if (!isNaN(input.trim())) {
            result = await searchUserById(parseInt(input.trim())); // Buscar por ID
        } else {
            result = await searchUserByName(input.trim()); // Buscar por nombre
        }

        // Aseguramos que `result` sea un array antes de actualizar el estado
        setResult(Array.isArray(result) ? result : []); // Actualiza el estado con un array vacío si no es un array
    };


    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/delete/${id}`);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const updateUser = async (id, updatedName, updatedEmail) => {
        console.log("Datos a enviar:", { updatedName, updatedEmail });

        if (!updatedName || !updatedEmail) {
            Swal.fire("Error", "Los campos de nombre y correo son obligatorios.", "error");
            return;
        }

        try {
            await axios.put(`http://localhost:5002/update/${id}`, {
                name: updatedName,
                email: updatedEmail,
            });

            Swal.fire("Actualizado", "El usuario ha sido actualizado.", "success");
            fetchUsers(); // Recargar la lista de usuarios
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            Swal.fire("Error", "No se pudo actualizar el usuario.", "error");
        }
    };

    const handleUpdate = (user) => {
        setSelectedUser(user);
        setName(user.name);
        setEmail(user.email);

        Swal.fire({
            title: "Editar Usuario",
            html: `
        <input id="swal-name" class="swal2-input" placeholder="Nombre" value="${user.name}">
        <input id="swal-email" class="swal2-input" placeholder="Correo" value="${user.email}">
      `,
            showCancelButton: true,
            confirmButtonText: "Actualizar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const newName = document.getElementById("swal-name").value.trim();
                const newEmail = document.getElementById("swal-email").value.trim();

                if (!newName || !newEmail) {
                    Swal.showValidationMessage("Por favor, ingrese un nombre y un correo.");
                    return false;
                }

                return { newName, newEmail };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                updateUser(user.id, result.value.newName, result.value.newEmail);
            }
        });
    };
    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id); // Llamar a la función de eliminación si el usuario confirma
                Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
            }
        });
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '16px' }}>
                <h1>Bienvenido al gestor de administración</h1>
                <div className="container mt-4">
                    {/* Tarjeta principal */}
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white text-center">
                            <h4>Gestión de Cliente</h4>
                        </div>
                        <div className="card-body">

                            {/* Tarjeta interna para Detalles de Clientes */}
                            <div className="card">
                                <div className="card-header bg-secondary text-white">
                                    <h5>Detalles Clientes</h5>
                                </div>
                                <div className="card-body">

                                    {/* 🔍 Input de búsqueda + Botón */}
                                    <div className="d-flex justify-content-end mb-3">
                                        <input
                                            type="text"
                                            className="form-control me-2 w-auto"
                                            placeholder="Buscar"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                        <button className="btn btn-primary px-4 py-2" onClick={handleSearch}>
                                            <FaSearch /> Buscar
                                        </button>
                                    </div>

                                    {/* Tabla de clientes */}
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido</th>
                                                    <th>Cédula</th>
                                                    <th>Teléfono</th>
                                                    <th>Ciudad</th>
                                                    <th>Dirección</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(result) && result.length === 0 && input.trim() === "" ? (
                                                    clients && clients.length > 0 ? (
                                                        clients.map((client) => (
                                                            <tr key={client.id}>
                                                                <td>{client.id}</td>
                                                                <td>{client.nombre}</td>
                                                                <td>{client.apellido}</td>
                                                                <td>{client.cedula}</td>
                                                                <td>{client.telefono}</td>
                                                                <td>{client.ciudad}</td>
                                                                <td>{client.direccion}</td>
                                                                <td>
                                                                    <button className="btn btn-sm btn-warning me-1" onClick={() => handleUpdate(client)}>
                                                                        <FaEdit /> Editar
                                                                    </button>
                                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(client.id)}>
                                                                        <FaTrash /> Eliminar
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="8" className="text-center text-muted">No hay clientes disponibles</td>
                                                        </tr>
                                                    )
                                                ) : Array.isArray(result) && result.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="8" className="text-center text-muted">No se encontraron resultados.</td>
                                                    </tr>
                                                ) : (
                                                    Array.isArray(result) && result.length > 0 ? (
                                                        result.map((user) => (
                                                            <tr key={user.id}>
                                                                <td>{user.id}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>
                                                                    <span className={`badge ${user.role === "admin" ? "bg-danger" : "bg-success"}`}>
                                                                        {user.role}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleUpdate(user)}>
                                                                        <FaEdit /> Editar
                                                                    </button>
                                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                                                                        <FaTrash /> Eliminar
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="8" className="text-center text-muted">No se encontraron resultados.</td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </div>
    );
}
