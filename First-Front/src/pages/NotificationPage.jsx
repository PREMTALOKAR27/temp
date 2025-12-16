import { useEffect, useMemo } from "react";
import { notificationStore } from "../store/notificationStore";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { authStore } from "../store/authStore";

function NotificationsPage() {
  const { authData } = authStore();
  const {
    allNotifications,
    personalNotifications,
    fetchAll,
    fetchByUserId,
    connectWebSocket,
    disconnectWebSocket,
    markAsRead,
    createNotification,
  } = notificationStore();

  const userId = authData?.id || null;

  useEffect(() => {
    fetchAll();
    if (userId) {
      fetchByUserId(userId);
    }
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [userId]);

  // ⬇️ Reusable render function
  const renderList = (list, userSpecific = false) => (
    <List className="bg-white rounded-lg shadow-sm">
      {list.length === 0 ? (
        <Typography
          variant="body2"
          className="text-gray-500 text-center py-4"
        >
          No notifications found
        </Typography>
      ) : (
        list.map((n) => (
          <div key={n.id}>
            <ListItem
              className={`flex justify-between ${
                n.read ? "bg-gray-100" : "bg-blue-50"
              } rounded-md my-1`}
            >
              <ListItemText
                primary={n.message || "New notification"}
                secondary={`User ID: ${n.userId || "N/A"}`}
              />
              {!n.read && userId && userSpecific && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => markAsRead(n.id, userId)}
                >
                  Mark as Read
                </Button>
              )}
            </ListItem>
            <Divider />
          </div>
        ))
      )}
    </List>
  );

  // ⬇️ useMemo to avoid recalculating lists unless data changes
  const personalList = useMemo(
    () => renderList(personalNotifications, true),
    [personalNotifications, userId]
  );

  const allList = useMemo(
    () => renderList(allNotifications, false),
    [allNotifications]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Personal Notifications */}
      <Card className="w-full lg:w-1/2 shadow-xl rounded-2xl">
        <CardContent>
          <Typography variant="h5" className="mb-4 font-bold text-gray-800">
            Personal Notifications
          </Typography>
          {personalList}
        </CardContent>
      </Card>

      {/* All Notifications */}
      <Card className="w-full lg:w-1/2 shadow-xl rounded-2xl">
        <CardContent>
          <Typography variant="h5" className="mb-4 font-bold text-gray-800">
            All Notifications
          </Typography>
          {allList}
        </CardContent>
      </Card>

      {/* Create Test Notification */}
      <div className="fixed bottom-6 right-6">
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            createNotification({
              message: "Test notification 🎉",
              userId,
              read: false,
            })
          }
        >
          Create Test Notification
        </Button>
      </div>
    </div>
  );
}

export default NotificationsPage;
