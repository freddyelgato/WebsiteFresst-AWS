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
            // If there's no token, redirect to login
            router.push('/login');
            return;
        }

        const handleLogout = async () => {
            try {
                // Send the logout request to the backend
                const response = await axios.post('http://localhost:3002/logout', {}, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });

                if (response.status === 200) {
                    // Remove the cookies and redirect to login
                    Cookies.remove('token');
                    Cookies.remove('role');
                    alert('Logged out successfully.');
                    router.push('/login');
                }
            } catch (error) {
                // Handle error if logout fails
                console.error('Error logging out:', error.response?.data?.message || error.message);

                if (error.response) {
                    // Handle server errors
                    switch (error.response.status) {
                        case 400:
                            alert('Invalid token. Please log in again.');
                            break;
                        case 401:
                            alert('Unauthorized. Please log in again.');
                            break;
                        case 500:
                            alert('Server error. Please try again later.');
                            break;
                        default:
                            alert('Unknown error: ' + error.response.data.message);
                    }
                } else if (error.request) {
                    alert('Request error. No response from the server.');
                } else {
                    alert('Unknown error: ' + error.message);
                }

                // Redirect to login even if there's an error
                router.push('/login');
            }
        };

        handleLogout();
    }, [router]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <p>Logging out...</p>
        </div>
    );
};

export default LogoutPage;
