'use client';

import React from 'react';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import CardGrid from "../../components/CardGrid";
import Navbar from "../../components/Navbar"; // Ruta correcta, retrocedemos dos niveles

import { useRouter } from 'next/navigation';
import ProtectedPage from '@/components/ProtectedPage';


const AdminPage = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <ProtectedPage role="admin">
              <Navbar />
        <h1>Bienvenido al Panel de Admin</h1>
        <CardGrid />
            <nav>
                <Link href="/logout">
                   
                    <button onClick={handleLogout} className="px-4 py-2 bg-blue-600 text-black rounded">Logout</button>
                </Link>
            </nav>
        </ProtectedPage>

    );
};

export default AdminPage;