import { api } from "src/boot/axios.js";

export async function deleteUser({ id }) {
  const uri = `user/${id}`;
  try {
    const response = await api.delete(uri);
    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
  }
}

export async function getUser({ id }) {
  const uri = `user/${id}`;
  try {
    const response = await api.get(uri);
    const user = response.data;
    return user;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
  }
}

export async function updateUser({ id }, userData) {
  const uri = `user/${id}`;
  try {
    const response = await api.put(uri, userData);
    const user = response.data;
    return user;
  } catch (error) {
    console.error("Erreur lors de la modification de l'utilisateur :", error);
  }
}
