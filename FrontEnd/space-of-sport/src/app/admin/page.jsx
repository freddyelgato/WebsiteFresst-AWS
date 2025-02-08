'use client';

import React from 'react';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/Sidebar";  // Correcta ruta hacia el Sidebar
import { useRouter } from 'next/navigation';
import ProtectedPage from '@/components/ProtectedPage';
import ListUsers from "../listUser/page";



const AdminPage = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <ProtectedPage role="admin">
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <main style={{ flexGrow: 1, padding: '16px' }}>
                    <h1>Bienvenido al gestor de administración</h1>

                    {/* Tarjeta principal de Usuarios */}
                    <div className="card mt-4 mb-4">
                        <div className="card-header">
                            <h5>Gestion de Usuarios</h5>
                        </div>
                        
                        <div className="card-body">
                            {/* Segunda tarjeta dentro de la tarjeta principal */}
                            <div className="card mt-3 shadow">
                                <div className="card-header bg-primary text-white">
                                    <h6 className="mb-0">Detalles de Usuarios</h6>
                                </div>
                                <div className="card-body">
                                    <ListUsers />
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