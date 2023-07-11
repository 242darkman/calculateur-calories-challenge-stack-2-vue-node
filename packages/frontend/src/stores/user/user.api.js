import { api } from "src/boot/axios.js";

export async function deleteUser({ id }) {
  const uri = `users/${id}`;
  try {
    const response = await api.delete(uri);
    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
  }
}
