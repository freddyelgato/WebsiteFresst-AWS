'use client';

import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import ProtectedPage from '@/components/ProtectedPage';
import ListUsers from "../listUser/page";
import ProductsPage from "../Products/page"; // Import the products page
import BranchesPage from "../Branches/page"; // Import the branches page

const AdminPage = () => {
    const [activePage, setActivePage] = useState("users"); // State to switch between Users, Products, and Branches

    return (
        <ProtectedPage role="admin">
            <div style={{ display: 'flex' }}>
                <Sidebar setActivePage={setActivePage} />
                <main style={{ flexGrow: 1, padding: '16px' }}>
                    <h1>Welcome to the admin manager</h1>

                    {/* Main card */}
                    <div className="card mt-4 mb-4">
                        <div className="card-header">
                            <h5>Management of {activePage === "users" ? "Users" : activePage === "products" ? "Products" : "Branches"}</h5>
                        </div>
                        <div className="card-body">
                            {/* Secondary card */}
                            <div className="card mt-3 shadow">
                                <div className="card-header bg-primary text-white">
                                    <h6 className="mb-0">
                                        {activePage === "users" ? "User Details" : activePage === "products" ? "Product Details" : "Branch Details"}
                                    </h6>
                                </div>
                                <div className="card-body">
                                    {activePage === "users" ? <ListUsers /> : activePage === "products" ? <ProductsPage /> : <BranchesPage />}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedPage>
    );
};

export default AdminPage;
