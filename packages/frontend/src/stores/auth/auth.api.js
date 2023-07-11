import { api } from "src/boot/axios.js";

export async function login({ loginName, password }) {
  const body = { loginName, password };
  try {
    const response = await api.post("/auth/login", body);
    const loginInfo = response.data;
    return loginInfo;
  } catch (error) {
    console.error("Erreur lors de l'authenfication de l'utilisateur :", error);
  }
}

export async function register({
  userName,
  firstName,
  lastName,
  email,
  password,
}) {
  const body = { userName, firstName, lastName, email, password };
  try {
    const response = await api.post("/auth/register", body);
    const registerInfo = response.data;
    return registerInfo;
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error);
  }
}

export async function logout() {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la déconnexion de l'utilisateur :", error);
  }
}

export async function me() {
  try {
    const response = await api.get("/auth/me");
    const userInfo = response.data;
    return userInfo;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur :",
      error
    );
  }
}
