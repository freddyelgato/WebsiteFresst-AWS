'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ProtectedPage = ({ children, role }) => {
    const [isLoading, setIsLoading] = useState(true);  // Para controlar el estado de carga
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        const userRole = Cookies.get('role');

        if (!token || userRole !== role) {
            router.push('/login'); // Redirige al login si no está autenticado o no tiene el rol correcto
        } else {
            setIsLoading(false);  // Si todo está correcto, cambia el estado de carga
        }
    }, [router, role]);

    if (isLoading) {
        return <div>Loading...</div>; // Muestra un cargador mientras verificas
    }

    return <>{children}</>;
};

export default ProtectedPage;
