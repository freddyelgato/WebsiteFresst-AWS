"use client";

import React, { useState, useEffect } from 'react';
import BranchTable from './BranchTable';
import BranchForm from './BranchForm';
import styles from '../../styles/StartPageModule.css';

const BranchesPage = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://localhost:4012/api/branches'); // New URL to fetch all branches
        const data = await response.json();
        setBranches(data.branches || []);
        setFilteredBranches(data.branches || []);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    let filtered = branches;
    if (searchQuery) {
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredBranches(filtered);
  }, [searchQuery, branches]);

  const handleCreateBranch = () => {
    setSelectedBranch(null);
    setIsFormVisible(true);
  };

  const handleSaveBranch = async (formData, isEdit = false) => {
    try {
      const url = isEdit
        ? `http://localhost:4011/api/branches/edit/${selectedBranch._id}` // URL to edit a branch
        : 'http://localhost:4010/api/branches/create'; // URL to create a new branch
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedBranch = await response.json();
        setBranches(prevBranches =>
          isEdit
            ? prevBranches.map(branch =>
                branch._id === updatedBranch.branch._id ? updatedBranch.branch : branch
              )
            : [...prevBranches, updatedBranch.branch]
        );
        setIsFormVisible(false);
      } else {
        console.error('Error saving branch:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error saving branch:', error);
    }
  };

  const handleEditBranch = (branch) => {
    setSelectedBranch(branch);
    setIsFormVisible(true);
  };

  const handleDeleteBranch = async (branchId) => {
    try {
      const response = await fetch(`http://localhost:4013/api/branches/delete/${branchId}`, { // New URL to delete a branch
        method: 'DELETE',
      });

      if (response.ok) {
        setBranches(prevBranches => prevBranches.filter(branch => branch._id !== branchId));
      } else {
        console.error('Error deleting branch:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>🏢 Branch Management</h1>
      <div className={styles.buttons}>
        <button onClick={handleCreateBranch}>Create New Branch</button>
        <input
          type="text"
          placeholder="Search branches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isFormVisible ? (
        <BranchForm
          branch={selectedBranch}
          onSave={(formData) => handleSaveBranch(formData, !!selectedBranch)}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <BranchTable
          branches={filteredBranches}
          onDelete={handleDeleteBranch}
          onEdit={handleEditBranch}
        />
      )}
    </div>
  );
};

export default BranchesPage;
