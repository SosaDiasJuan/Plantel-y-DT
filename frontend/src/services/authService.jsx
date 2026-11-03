import { apiFetch } from "./api";

export async function login(credentials) {

  return apiFetch("/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(credentials)
  });
}

export async function logout() {

  return apiFetch("/auth/logout", {
      method: "POST",
  });
}

export async function getCurrentUser() {

  try {
    return await apiFetch("/auth/me");
  } catch {
    return null;
  }
}
