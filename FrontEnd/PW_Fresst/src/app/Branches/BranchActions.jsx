import React from 'react';

const BranchActions = ({ branch, onDelete, onEdit }) => {
  return (
    <div>
      <button onClick={() => onEdit(branch)}>Edit</button>
      <button onClick={() => onDelete(branch._id)}>Delete</button> 
    </div>
  );
};

export default BranchActions;
