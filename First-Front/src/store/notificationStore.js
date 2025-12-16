import { create } from "zustand";
import { Client } from "@stomp/stompjs";
import api from "../config/AxiosInterceptor";

const API_BASE = "/api/v1/notifications";

export const notificationStore = create((set, get) => ({
  allNotifications: [],
  personalNotifications: [],
  loading: false,
  stompClient: null,

  // Fetch ALL notifications
  fetchAll: async () => {
    try {
      set({ loading: true });
      const res = await api.get(API_BASE);
      set({ allNotifications: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching all notifications", error);
      set({ loading: false });
    }
  },

  // Fetch PERSONAL notifications (frontend filter)
  fetchByUserId: async (id) => {
    try {
      set({ loading: true });
      const res = await api.get(API_BASE);
      const allNotifications = res.data;
      const userNotifications = allNotifications.filter(
        (n) => String(n.userId) === String(id)
      );
      set({
        personalNotifications: userNotifications,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching notifications by userId", error);
      set({ loading: false });
    }
  },

  markAsRead: async (id, userId) => {
    try {
      const res = await api.put(`${API_BASE}/${id}/read`, null, {
        params: { userId },
      });

      // Update both lists
      set((state) => ({
        allNotifications: state.allNotifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        personalNotifications: state.personalNotifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      }));

      return res.data;
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  },

  createNotification: async (notification) => {
    try {
      const res = await api.post(`${API_BASE}/create`, notification);
      set((state) => ({
        allNotifications: [...state.allNotifications, res.data],
        personalNotifications:
          String(res.data.userId) === String(notification.userId)
            ? [...state.personalNotifications, res.data]
            : state.personalNotifications,
      }));
      return res.data;
    } catch (error) {
      console.error("Error creating notification", error);
    }
  },

  connectWebSocket: () => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("WebSocket connected ✅");
      client.subscribe("/topic/notifications", (message) => {
        const notification = JSON.parse(message.body);
        set((state) => ({
          allNotifications: [...state.allNotifications, notification],
          personalNotifications:
            String(notification.userId) === String(get().authUserId)
              ? [...state.personalNotifications, notification]
              : state.personalNotifications,
        }));
      });
    };

    client.onStompError = (frame) => {
      console.error("WebSocket error:", frame);
    };

    client.activate();
    set({ stompClient: client });
  },

  disconnectWebSocket: () => {
    const client = get().stompClient;
    if (client) {
      client.deactivate();
      console.log("WebSocket disconnected ❌");
      set({ stompClient: null });
    }
  },
}));
