'use client';

import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import CardGrid from "../../components/CardGrid";
import { useRouter } from 'next/navigation';


const AdminPage = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <div>
            <h1>Bienvenido a la página de Admin</h1>
            <CardGrid />
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default AdminPage;