'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedPage from '@/components/ProtectedPage';

const UserPage = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <ProtectedPage role="user">
            <h1>Bienvenido a la página de Usuario</h1>
          
            <nav>
                <Link href="/logout">
                    <button className="px-4 py-2 bg-red-500 text-black rounded">Cerrar sesión</button>
                </Link>
            </nav>
        </ProtectedPage>
    );
};

export default UserPage;