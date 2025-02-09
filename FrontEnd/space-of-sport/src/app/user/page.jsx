'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavbarUser from "../../components/NavbarUser";
import ProtectedPage from '@/components/ProtectedPage';

const UserPage = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <ProtectedPage role="user">
            <NavbarUser />
            {/* Main Content */}
            <div className="container px-4 px-lg-5">
                {/* Heading Row */}
                <div className="row gx-4 gx-lg-5 align-items-center my-5">
                    <div className="col-lg-7">
                        <img
                            className="img-fluid rounded mb-4 mb-lg-0"
                            src="/image3.jpg"
                            alt="Vitrinas y Frigoríficos Fresst"
                        />
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">Welcome to Vitrinas y Frigoríficos Fresst!</h1>
                        <p>Leaders in industrial refrigeration and display solutions.</p>
                        <a className="btn btn-primary btn-lg" href="/products">
                            Discover Our Products
                        </a>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="card text-white bg-secondary my-5 py-4 text-center">
                    <div className="card-body">
                        <p className="text-white m-0">
                            High-quality refrigeration and storage solutions for your business.
                        </p>
                    </div>
                </div>

                {/* Content Row */}
                <div className="row gx-4 gx-lg-5">
                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h2 className="card-title">Our Objective</h2>
                                <p className="card-text">
                                    To provide businesses with efficient and durable refrigeration and display equipment, ensuring product preservation and optimal presentation.
                                </p>
                            </div>
                            <div className="card-footer">
                                <a className="btn btn-primary btn-sm" href="/about">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h2 className="card-title">Our Mission</h2>
                                <p className="card-text">
                                    To deliver high-performance refrigeration and storage solutions that meet the needs of businesses, ensuring efficiency, reliability, and innovation in every product we offer.
                                </p>
                            </div>
                            <div className="card-footer">
                                <a className="btn btn-primary btn-sm" href="/mission">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h2 className="card-title">Our Vision</h2>
                                <p className="card-text">
                                    To become a global leader in industrial refrigeration and display solutions, recognized for our quality, innovation, and commitment to customer satisfaction.
                                </p>
                            </div>
                            <div className="card-footer">
                                <a className="btn btn-primary btn-sm" href="/vision">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            
        </ProtectedPage>
    );
};

export default UserPage;
