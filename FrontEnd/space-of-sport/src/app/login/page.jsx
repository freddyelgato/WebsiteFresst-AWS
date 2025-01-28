'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                Cookies.set('token', data.token); // Guarda el token en cookies
                setMessage(data.message);
                if (data.role === 'admin') {
                    window.location.href = '/admin';
                } else if (data.role === 'user') {
                    window.location.href = '/user';
                } else {
                    setMessage('Rol no reconocido'); // Manejo de errores en caso de un rol inesperado
                }
                //window.location.href = data.role === 'admin' ? '/admin' : '/user'; // Redirige según el rol
            } else {
                setMessage(data.message); // Muestra mensaje de error
            }
        } catch (error) {
            setMessage('Error al iniciar sesión');
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
