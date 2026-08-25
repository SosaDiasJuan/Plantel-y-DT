const API_URL = "http://localhost:8080/api";

export async function login(credentials) {

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      credentials: "include",

      body: JSON.stringify(credentials)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Error al iniciar sesión"
    );
  }

  return data;
}

export async function logout() {

  const response = await fetch(
    `${API_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include"
    }
  );

  return response.json();
}

export async function getCurrentUser() {

  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}