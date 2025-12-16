// store/transactionStore.js
import { create } from 'zustand';
import api from '../config/AxiosInterceptor';

const API_BASE = 'api/v1/transactions'; 

export const useTransactionStore = create((set) => ({
  myTransactions: [],
  allTransactions: [],
  loading: false,
  error: null,

  // Fetch user's transactions
  fetchMyTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`${API_BASE}/my-transactions`);
      console.log('res',response)
      set({ myTransactions: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch all transactions
  fetchAllTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`${API_BASE}/all`);
      set({ allTransactions: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Redeem points
  redeemPoints: async (transaction) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(`${API_BASE}/redeem`, transaction);
      // Optionally, add the new transaction to myTransactions
      set((state) => ({
        myTransactions: [...state.myTransactions, response.data],
        loading: false,
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },
}));
