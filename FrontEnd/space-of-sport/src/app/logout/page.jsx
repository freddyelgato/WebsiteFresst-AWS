'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');

        if (!token) {
            // Si no hay token, redirigir al login
            router.push('/login');
            return;
        }

        const handleLogout = async () => {
            try {
                // Enviar la solicitud de logout al backend
                const response = await axios.post('http://localhost:3002/logout', {}, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });

                if (response.status === 200) {
                    // Eliminar las cookies y redirigir al login
                    Cookies.remove('token');
                    Cookies.remove('role');
                    alert('Sesión cerrada exitosamente.');
                    router.push('/login');
                }
            } catch (error) {
                // Manejar el error si no se puede cerrar sesión
                console.error('Error al cerrar sesión:', error.response?.data?.message || error.message);

                if (error.response) {
                    // Manejo de errores del servidor
                    switch (error.response.status) {
                        case 400:
                            alert('Token inválido. Por favor, inicia sesión nuevamente.');
                            break;
                        case 401:
                            alert('No autorizado. Por favor, inicia sesión nuevamente.');
                            break;
                        case 500:
                            alert('Error en el servidor. Por favor, intenta de nuevo más tarde.');
                            break;
                        default:
                            alert('Error desconocido: ' + error.response.data.message);
                    }
                } else if (error.request) {
                    alert('Error en la solicitud. No se recibió respuesta del servidor.');
                } else {
                    alert('Error desconocido: ' + error.message);
                }

                // Redirigir al login incluso si hay errores
                router.push('/login');
            }
        };

        handleLogout();
    }, [router]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <p>Cerrando sesión...</p>
        </div>
    );
};

export default LogoutPage;