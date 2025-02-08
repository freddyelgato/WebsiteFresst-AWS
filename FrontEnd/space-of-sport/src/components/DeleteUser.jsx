import axios from 'axios';

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5001/delete/${userId}`);
    console.log('Usuario eliminado:', response.data);
  } catch (error) {
    console.error('Error al eliminar usuario:', error.response.data);
  }
};
