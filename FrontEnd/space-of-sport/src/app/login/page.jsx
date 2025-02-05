'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import './styles.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        const role = Cookies.get('role');

        if (token) {
            router.push(role === 'admin' ? '/admin' : '/user');
        }
    }, [router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        if (!formData.email || !formData.password) {
            setErrorMessage('Por favor ingrese ambos campos: email y contraseña');
            setIsLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:3001/login', formData);
            const { token, role } = data;

            Cookies.set('token', token, { expires: 5 });
            Cookies.set('role', role, { expires: 5 });

            alert(`Bienvenido, ${role === 'admin' ? 'Admin' : 'Usuario'}`);
            router.push(role === 'admin' ? '/admin' : '/user');
        } catch (error) {
            const status = error.response?.status;
            const messages = {
                400: 'Datos inválidos. Verifica los campos.',
                401: 'Credenciales incorrectas.',
                500: 'Error en el servidor. Intenta más tarde.',
            };

            setErrorMessage(messages[status] || 'Error desconocido. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    }, [formData, router]);

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Iniciar Sesión</h1>
                <form onSubmit={handleLogin}>
                    {['email', 'password'].map((field) => (
                        <div className="form-group" key={field}>
                            <label htmlFor={field} className="form-label">
                                {field.charAt(0).toUpperCase() + field.slice(1)}:
                            </label>
                            <input
                                id={field}
                                name={field}
                                type={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                    ))}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button type="submit" disabled={isLoading} className="login-button">
                        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                <p className="register-link">
                    ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </p>
                <button onClick={() => router.push('/')} className="back-home-button">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
