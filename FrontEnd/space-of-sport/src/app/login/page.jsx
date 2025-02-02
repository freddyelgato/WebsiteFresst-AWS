'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // Manejo de errores
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
        setErrorMessage(null); // Resetear mensaje de error

        if (!email || !password) {
            setErrorMessage('Por favor ingrese ambos campos: email y contraseña');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            const { token, role } = response.data;
            console.log('Login exitoso:', response.data); // Verifica los datos de la respuesta

            Cookies.set('token', token, { expires: 5 / (24 * 60) });
            Cookies.set('role', role, { expires: 5 / (24 * 60) });

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
                // Manejo de errores del servidor
                switch (error.response.status) {
                    case 400:
                        setErrorMessage('Datos inválidos. Por favor, verifica los campos.');
                        break;
                    case 401:
                        setErrorMessage('Credenciales incorrectas');
                        break;
                    case 500:
                        setErrorMessage('Error en el servidor. Por favor, intenta de nuevo más tarde.');
                        break;
                    default:
                        setErrorMessage('Error desconocido: ' + error.response.data.message);
                }
            } else if (error.request) {
                setErrorMessage('Error en la solicitud. No se recibió respuesta del servidor.');
            } else {
                setErrorMessage('Error desconocido: ' + error.message);
            }
        } finally {
            setIsLoading(false); // Detener el estado de carga
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px', backgroundColor: '#fff' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h1>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                boxSizing: 'border-box',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                boxSizing: 'border-box',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    {errorMessage && (
                        <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    ¿No tienes una cuenta aún?{' '}
                    <a href="/register" style={{ color: '#007BFF', textDecoration: 'none' }}>
                        Regístrate
                    </a>
                </p>
                {/* Botón "Back to Home" dentro de la tarjeta */}
                <button
                    onClick={() => router.push('/')}
                    style={{
                        width: '100%',
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '15px', // Espacio entre el formulario y el botón
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    Back to Home
                </button>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

            <script src="js/scripts.js"></script>
        </div>

    );
};

export default LoginPage;