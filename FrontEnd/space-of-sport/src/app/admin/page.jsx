'use client';

import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import ProtectedPage from '@/components/ProtectedPage';
import ListUsers from "../listUser/page";
import ProductsPage from "../products/page"; // Importa la página de productos

const AdminPage = () => {
    const [activePage, setActivePage] = useState("users"); // Estado para cambiar entre Users y Products

    return (
        <ProtectedPage role="admin">
            <div style={{ display: 'flex' }}>
                <Sidebar setActivePage={setActivePage} />
                <main style={{ flexGrow: 1, padding: '16px' }}>
                    <h1>Bienvenido al gestor de administración</h1>

                    {/* Tarjeta principal */}
                    <div className="card mt-4 mb-4">
                        <div className="card-header">
                            <h5>Gestión de {activePage === "users" ? "Usuarios" : "Productos"}</h5>
                        </div>
                        <div className="card-body">
                            {/* Tarjeta secundaria */}
                            <div className="card mt-3 shadow">
                                <div className="card-header bg-primary text-white">
                                    <h6 className="mb-0">
                                        {activePage === "users" ? "Detalles de Usuarios" : "Detalles de Productos"}
                                    </h6>
                                </div>
                                <div className="card-body">
                                    {activePage === "users" ? <ListUsers /> : <ProductsPage />}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedPage>
    );
};

export default AdminPage;
