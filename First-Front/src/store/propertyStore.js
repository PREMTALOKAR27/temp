import { create } from "zustand";
import api from "../config/AxiosInterceptor";

const API_BASE = "/api/v1/properties";

export const propertyStore = create((set, get) => ({
  allProperties: [],
  personalProperties: [],
  loading: false,

  // Fetch all properties
  fetchAll: async () => {
    try {
      set({ loading: true });
      const res = await api.get(API_BASE);
      console.log(res)
      set({ allProperties: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching all properties", error);
      set({ loading: false });
    }
  },

  // Fetch properties by user ID
  fetchByUserId: async (userId) => {
    try {
      set({ loading: true });
      const res = await api.get(`${API_BASE}/user/${userId}`);
      set({ personalProperties: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching properties by userId", error);
      set({ loading: false });
    }
  },

  // Create a new property
  createProperty: async (propertyData) => {
    try {
      const formData = new FormData();
      for (const key in propertyData) {
        formData.append(key, propertyData[key]);
      }

      const res = await api.post(API_BASE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        allProperties: [...state.allProperties, res.data],
        personalProperties:
          String(res.data.userId) === String(propertyData.userId)
            ? [...state.personalProperties, res.data]
            : state.personalProperties,
      }));

      return res.data;
    } catch (error) {
      console.error("Error creating property", error);
    }
  },

  // Edit an existing property
  editProperty: async (id, propertyData) => {
    try {
      const formData = new FormData();
      for (const key in propertyData) {
        formData.append(key, propertyData[key]);
      }

      const res = await api.put(`${API_BASE}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        allProperties: state.allProperties.map((p) =>
          p.id === id ? res.data : p
        ),
        personalProperties: state.personalProperties.map((p) =>
          p.id === id ? res.data : p
        ),
      }));

      return res.data;
    } catch (error) {
      console.error("Error editing property", error);
    }
  },

  // Delete a property
  deleteProperty: async (id) => {
    try {
      await api.delete(`${API_BASE}/${id}`);
      set((state) => ({
        allProperties: state.allProperties.filter((p) => p.id !== id),
        personalProperties: state.personalProperties.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting property", error);
    }
  },
}));
