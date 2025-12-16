
// error in this will solve later
import { create } from 'zustand';
import api from '../config/AxiosInterceptor';

const API_BASE = 'api/v1/leads';

export const leadStore = create((set) => ({
  leads: [],
  loading: false,
  error: null,

  // Fetch all leads
  fetchAllLeads: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`${API_BASE}/all`);
      console.log(response)
      set({ leads: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Create a new lead by ID
  createLead: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(`${API_BASE}/${id}`);
      // Optionally append the new lead to the existing leads
      set((state) => ({
        leads: [...state.leads, response.data],
        loading: false,
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },
}));
