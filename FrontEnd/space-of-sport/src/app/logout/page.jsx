'use client';

import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';  // Asegúrate de tener jwt-decode instalado

const LogoutPage = () => {
    const router = useRouter(); // Usar el hook de next/navigation

    // Función para verificar si el token ha expirado
    const isTokenExpired = (token) => {
        if (!token) return true; // Si no hay token, se considera expirado
        const decodedToken = jwt.decode(token);
        return decodedToken.exp < Date.now() / 1000;  // Compara la fecha de expiración
    };

    const handleLogout = async () => {
        const token = Cookies.get('token'); // Obtener el token de las cookies

        if (!token || isTokenExpired(token)) {
            console.error('Token no válido o expirado, cerrando sesión...');
            alert('El token ha expirado o no es válido. Inicie sesión nuevamente.');
            Cookies.remove('token');  // Eliminar el token de las cookies
            router.push('/login');  // Redirigir al login
            return;
        }

        try {
            // Enviar la solicitud de logout con el token en el encabezado Authorization
            const response = await axios.post(
                'http://localhost:3003/logout', 
                {}, // Cuerpo vacío si solo necesitas el token
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Agregar el token al encabezado
                    },
                }
            );

            // Si el logout es exitoso, eliminar el token y redirigir al login
            console.log(response.data.message); // Mensaje del servidor
            alert('Sesión cerrada correctamente');

            // Eliminar el token de las cookies
            Cookies.remove('token');

            // Redirigir al login
            router.push('/login');

        } catch (error) {
            // Manejar el error si no se puede cerrar sesión
            console.error('Error al cerrar sesión:', error.response?.data?.message || error.message);
            alert('Hubo un problema al cerrar sesión. Intenta de nuevo.');
            router.push('/login'); // Redirigir al login incluso si hay errores
        }
    };

    useEffect(() => {
        handleLogout();  // Ejecutar el logout cuando el componente se monta
    }, []);

    return (
        <div>
            <h1>Logout</h1>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default LogoutPage;

