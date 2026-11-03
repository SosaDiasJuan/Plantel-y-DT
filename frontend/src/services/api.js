const API_URL = import.meta.env.VITE_API_URL || "/api";

export async function apiFetch(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json", ...options.headers },
        ...options,
    });

    if (response.status === 204) return null;
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || "No pudimos completar la solicitud");
    }
    return data;
}
