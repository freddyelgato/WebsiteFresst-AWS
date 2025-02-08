import axios from "axios";

export const searchUserById = async (id) => {
    const query = {
      query: `{ searchUserById(id: ${id}) { id name email } }`
    };
  
    try {
      const response = await axios.post("http://localhost:5003/graphql", query, {
        headers: { "Content-Type": "application/json" }
      });
      // Aseguramos que siempre devolvemos un array
      return response.data.data.searchUserById ? [response.data.data.searchUserById] : [];
    } catch (error) {
      console.error("Error al buscar usuario por ID:", error);
      return [];
    }
  };
  
  export const searchUserByName = async (name) => {
    const query = {
      query: `{ searchUserByName(name: \"${name}\") { id name email } }`
    };
  
    try {
      const response = await axios.post("http://localhost:5003/graphql", query, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data.data.searchUserByName || [];  // Devuelve un array vacío si no hay resultado
    } catch (error) {
      console.error("Error al buscar usuario por nombre:", error);
      return [];
    }
  };
  
