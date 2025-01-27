'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const UserPage = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <div>
            <h1>Bienvenido a la página de Usuario</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default UserPage;