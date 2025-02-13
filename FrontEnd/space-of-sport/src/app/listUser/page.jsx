"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { searchUserById, searchUserByName } from "@/utils/api";
import Swal from "sweetalert2";
import axios from "axios";

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = async () => {
    if (!input.trim()) {
      setResult([]);  // If the input is empty, reset the results
      fetchUsers();  // Reload the full user list
      return;
    }

    let result = [];
    // Ensure the input is a number for searching by ID
    if (!isNaN(input.trim())) {
      result = await searchUserById(parseInt(input.trim())); // Search by ID
    } else {
      result = await searchUserByName(input.trim()); // Search by name
    }

    // Ensure `result` is an array before updating state
    setResult(Array.isArray(result) ? result : []); // Update the state with an empty array if it's not an array
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/delete/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (id, updatedName, updatedEmail) => {
    console.log("Data to send:", { updatedName, updatedEmail });

    if (!updatedName || !updatedEmail) {
      Swal.fire("Error", "Name and email fields are required.", "error");
      return;
    }

    try {
      await axios.put(`http://localhost:5002/update/${id}`, {
        name: updatedName,
        email: updatedEmail,
      });

      Swal.fire("Updated", "The user has been updated.", "success");
      fetchUsers(); // Reload the user list
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "Failed to update the user.", "error");
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);

    Swal.fire({
      title: "Edit User",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${user.name}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${user.email}">
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const newName = document.getElementById("swal-name").value.trim();
        const newEmail = document.getElementById("swal-email").value.trim();

        if (!newName || !newEmail) {
          Swal.showValidationMessage("Please enter a name and an email.");
          return false;
        }

        return { newName, newEmail };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser(user.id, result.value.newName, result.value.newEmail);
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id); // Call the delete function if the user confirms
        Swal.fire("Deleted", "The user has been deleted.", "success");
      }
    });
  };

  return (
    <div className="card-body">
      <div className="table-responsive">
        {/* 🔍 Search Input + Button */}
        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            className="form-control me-2 w-auto"  // Changed to w-auto to adjust the width
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary px-4 py-2" onClick={handleSearch}> {/* Adjusted to make it more rectangular */}
            <FaSearch /> Search
          </button>
        </div>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(result) && result.length === 0 && input.trim() === "" ? (  // If the input is empty and there are no results
              users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === "admin" ? "bg-danger" : "bg-success"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleUpdate(user)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No users available
                  </td>
                </tr>
              )
            ) : Array.isArray(result) && result.length === 0 ? (  // If no search results are found
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No results found.
                </td>
              </tr>
            ) : (  // If there are search results
              Array.isArray(result) && result.length > 0 ? (
                result.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === "admin" ? "bg-danger" : "bg-success"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleUpdate(user)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No results found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
