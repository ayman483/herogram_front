const API_URL = "http://167.172.103.104:3000";

const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login
    throw new Error("Unauthorized access. Logging out...");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const loginUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: data.username, password: data.password }),
  });
  return handleResponse(response);
};

export const uploadFile = async (file) => {
  const token = localStorage.getItem("token");
  // const formData = new FormData();
  // formData.append("file", file);

  const response = await fetch(`${API_URL}/files/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: file,
  });
  return handleResponse(response);
};

export const fetchFiles = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/files/files`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
};
