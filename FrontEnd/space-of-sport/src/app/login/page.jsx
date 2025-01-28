'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Verificar el token en las cookies
    useEffect(() => {
        const token = Cookies.get('token');
        const role = Cookies.get('role');
        console.log('Token:', token); // Verificar si el token está presente
        console.log('Role:', role);   // Verificar el rol

        if (token) {
            // Redirigir si ya está autenticado
            if (role === 'admin') {
                router.push('/admin');
            } else if (role === 'user') {
                router.push('/user');
            }
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Inicia el estado de carga

        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            // Guarda el token y el rol en las cookies
            const { token, role } = response.data;
            console.log('Login exitoso:', response.data); // Verifica los datos de la respuesta

            Cookies.set('token', token, { expires: 3 / (24 * 60) });
            Cookies.set('role', role, { expires: 3 / (24 * 60) });

            alert(`Bienvenido, ${role === 'admin' ? 'Admin' : 'Usuario'}`);

            // Redirige según el rol
            if (role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/user');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            if (error.response) {
                console.error('Respuesta del servidor:', error.response);
            } else if (error.request) {
                console.error('Solicitud sin respuesta:', error.request);
            } else {
                console.error('Error configurando la solicitud:', error.message);
            }
            alert('Error inesperado, por favor intenta de nuevo.');
        } finally {
            setIsLoading(false); // Detener el estado de carga
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
