import React from 'react';
import BranchActions from './BranchActions';
import styles from '../../styles/StartPageModule.css';

const BranchTable = ({ branches, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Branch List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Email</th>
            <th>Mobile Phone</th>
            <th>Landline Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map(branch => (
            <tr key={branch._id}>
              <td>{branch.name}</td>
              <td>{branch.address}</td>
              <td>{branch.city}</td>
              <td>{branch.email}</td>
              <td>{branch.mobilePhone}</td>
              <td>{branch.landlinePhone}</td>
              <td>
                <BranchActions branch={branch} onDelete={onDelete} onEdit={onEdit} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchTable;
