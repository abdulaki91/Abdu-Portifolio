import axios from "axios";
import baseUrl from "../baseURL/baseUrl";

// Create axios instance
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/api/auth/login", credentials),
  register: (userData) => api.post("/api/auth/register", userData),
  getProfile: () => api.get("/api/auth/profile"),
  verifyToken: () => api.get("/api/auth/verify"),
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get("/api/projects"),
  getById: (id) => api.get(`/api/projects/${id}`),
  create: (data) => api.post("/api/projects", data),
  update: (id, data) => api.put(`/api/projects/${id}`, data),
  delete: (id) => api.delete(`/api/projects/${id}`),
};

// Skills API
export const skillsAPI = {
  getAll: () => api.get("/api/skills"),
  getById: (id) => api.get(`/api/skills/${id}`),
  create: (data) => api.post("/api/skills", data),
  update: (id, data) => api.put(`/api/skills/${id}`, data),
  delete: (id) => api.delete(`/api/skills/${id}`),
};

// Experiences API
export const experiencesAPI = {
  getAll: () => api.get("/api/experiences"),
  getById: (id) => api.get(`/api/experiences/${id}`),
  create: (data) => api.post("/api/experiences", data),
  update: (id, data) => api.put(`/api/experiences/${id}`, data),
  delete: (id) => api.delete(`/api/experiences/${id}`),
};

// Settings API
export const settingsAPI = {
  getAll: () => api.get("/api/settings"),
  getBySetting: (key) => api.get(`/api/settings/${key}`),
  update: (data) => api.post("/api/settings", data),
  delete: (key) => api.delete(`/api/settings/${key}`),
};

// Upload API
export const uploadAPI = {
  uploadSingle: (type, file) => {
    const formData = new FormData();
    formData.append(type, file);
    return api.post(`/api/uploads/single/${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadMultiple: (type, files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(type, file);
    });
    return api.post(`/api/uploads/multiple/${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadMixed: (files) => {
    const formData = new FormData();
    Object.keys(files).forEach((fieldname) => {
      if (Array.isArray(files[fieldname])) {
        files[fieldname].forEach((file) => {
          formData.append(fieldname, file);
        });
      } else {
        formData.append(fieldname, files[fieldname]);
      }
    });
    return api.post("/api/uploads/mixed", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteFile: (filename) => api.delete(`/api/uploads/${filename}`),
  getFileInfo: (filename) => api.get(`/api/uploads/info/${filename}`),
};

// Initialize Database
export const initAPI = {
  initialize: () => api.post("/api/init"),
};

export default api;
