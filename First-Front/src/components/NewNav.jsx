import React, { useEffect, useState, useRef } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import titleLogo from "../assets/TitleLogo.png";
import { authStore } from "../store/authStore";
import api from "../config/AxiosInterceptor";

function NewNav() {
  const { authData } = authStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [localReadIds, setLocalReadIds] = useState(() => {
    try {
      const raw = localStorage.getItem("localReadNotifications");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? new Set(parsed) : new Set();
    } catch {
      return new Set();
    }
  });

  const persistLocalReadIds = (setOfIds) => {
    try {
      localStorage.setItem(
        "localReadNotifications",
        JSON.stringify(Array.from(setOfIds))
      );
    } catch {}
  };

  const applyLocalReadOverride = (list) => {
    return (Array.isArray(list) ? list : []).map((n) =>
      localReadIds.has(n.id) ? { ...n, isRead: true, read: true } : n
    );
  };

  const handleNavigate = () => {
    if (authData) navigate("/profile");
    else navigate("/login");
  };

  const sortNotifications = (list) => {
    const safeList = Array.isArray(list) ? list.slice() : [];
    return safeList.sort((a, b) => {
      const aUnread = !(a?.isRead ?? a?.read);
      const bUnread = !(b?.isRead ?? b?.read);
      if (aUnread !== bUnread) return aUnread ? -1 : 1;
      const aTime = a?.createdAt
        ? new Date(a.createdAt).getTime()
        : a?.timestamp
        ? new Date(a.timestamp).getTime()
        : a?.id ?? 0;
      const bTime = b?.createdAt
        ? new Date(b.createdAt).getTime()
        : b?.timestamp
        ? new Date(b.timestamp).getTime()
        : b?.id ?? 0;
      return bTime - aTime;
    });
  };

  const unreadCount =
    notifications?.filter((n) => !(n.isRead ?? n.read))?.length || 0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const loadNotifications = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/api/v1/notifications`);
        const merged = applyLocalReadOverride(res.data || []);
        setNotifications(sortNotifications(merged));
      } catch (err) {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, [localReadIds]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    setSelectedId(notificationId);
    setNotifications((prev) =>
      sortNotifications(
        prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: true, read: true } : n
        )
      )
    );
    setLocalReadIds((prev) => {
      const next = new Set(prev);
      next.add(notificationId);
      persistLocalReadIds(next);
      return next;
    });
    try {
      await api.put(`/api/v1/notifications/${notificationId}/read`);
    } catch {}
    setTimeout(() => setSelectedId(null), 800);
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(
          /^ +/,
          ""
        ).replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    } catch (_) {}
    navigate("/login");
    window.location.href = "/login";
  };

  const getUserInitials = () => {
    const name = (authData?.name || localStorage.getItem("name") || "").trim();
    if (!name) return "U";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
          <img
            src={titleLogo}
            alt="Logo"
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
          />
          <span className="text-base sm:text-lg font-bold text-gray-800 whitespace-nowrap leading-none">
            First-Buy
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center justify-center flex-1 space-x-5 xl:space-x-8 text-gray-700 font-medium text-sm xl:text-base">
          <Link
            to="/"
            className="text-black no-underline whitespace-nowrap hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/properties"
            className="text-black no-underline whitespace-nowrap hover:text-blue-600 transition-colors"
          >
            Properties
          </Link>
          <Link
            to="/rewards"
            className="text-black no-underline whitespace-nowrap hover:text-blue-600 transition-colors"
          >
            Rewards
          </Link>
          {/* Updated Contact Us link */}
          <a
            href="https://forms.gle/BQt3wwfd9Tc8nmWC7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black no-underline whitespace-nowrap hover:text-blue-600 transition-colors"
          >
            Contact Us
          </a>
          <Link
            to="/howitworks"
            className="text-black no-underline whitespace-nowrap hover:text-blue-600 transition-colors"
          >
            How it Works
          </Link>

          {/* BuilderDashboard link only for BUILDER role */}
          {authData?.role === "BUILDER" && (
            <Link
              to="/builder-dashboard"
              className="text-black font-semibold no-underline whitespace-nowrap hover:text-blue-600 transition-colors"
            >
              Builder Dashboard
            </Link>
          )}
        </ul>

        {/* Right side: Notifications & Profile */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {/* Notifications */}
          {authData && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="relative inline-flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-full hover:bg-gray-100 transition-colors duration-150"
                aria-label="Notifications"
                onClick={() => setNotifOpen((p) => !p)}
                title="Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9a6 6 0 10-12 0v.75a8.967 8.967 0 01-2.311 6.022c1.733.64 3.56 1.085 5.455 1.31m5.713 0a24.255 24.255 0 01-5.713 0m5.713 0a3 3 0 11-5.713 0"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 border-b border-gray-100 font-semibold">
                    Notifications
                  </div>
                  <div className="max-h-80 overflow-auto">
                    {loading ? (
                      <div className="p-4 text-sm text-gray-500">Loading...</div>
                    ) : error ? (
                      <div className="p-4 text-sm text-red-600">{error}</div>
                    ) : notifications.length > 0 ? (
                      <ul className="divide-y divide-gray-100">
                        {notifications.map((n) => {
                          const isUnread = !(n.isRead ?? n.read);
                          const isSelected = selectedId === n.id;
                          return (
                            <li
                              key={n.id}
                              className={`p-3 cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-blue-50"
                                  : isUnread
                                  ? "bg-gray-50 hover:bg-gray-100"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() => handleMarkAsRead(n.id)}
                            >
                              <div className="flex items-start gap-2">
                                <span
                                  className={`mt-1 inline-block w-2 h-2 rounded-full ${
                                    isUnread ? "bg-blue-600" : "bg-gray-300"
                                  }`}
                                />
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-800">
                                    {n.title || "Notification"}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {n.message || n.description}
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div className="p-4 text-sm text-gray-500">
                        No new notifications.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile / Login */}
          <button
            className={`flex items-center gap-2 border px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base transition-colors duration-150 ${
              authData
                ? "border-gray-300 text-gray-800 hover:bg-gray-50"
                : "border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
            onClick={handleNavigate}
          >
            {authData && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-semibold">
                {getUserInitials()}
              </span>
            )}
            {authData ? "Profile" : "Login"}
          </button>

          {authData && (
            <button
              className="border border-gray-300 text-gray-700 px-4 py-1.5 lg:px-5 lg:py-2 text-sm lg:text-base hover:bg-gray-50 rounded-full transition-colors duration-150"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4">
          <ul className="flex flex-col items-center text-center space-y-3 text-gray-700 font-medium">
            <li>
              <Link to="/properties" className="hover:text-blue-600 cursor-pointer">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/rewards" className="hover:text-blue-600 cursor-pointer">
                Rewards
              </Link>
            </li>
            {/* Updated mobile Contact Us link */}
            <li>
              <a
                href="https://forms.gle/BQt3wwfd9Tc8nmWC7"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 cursor-pointer"
              >
                Contact Us
              </a>
            </li>
            <li>
              <Link to="/howitworks" className="hover:text-blue-600 cursor-pointer">
                How it Works!
              </Link>
            </li>

            {/* BuilderDashboard link only for BUILDER role */}
            {authData?.role === "BUILDER" && (
              <li>
                <Link
                  to="/builder-dashboard"
                  className="hover:text-blue-600 cursor-pointer font-semibold"
                >
                  Builder Dashboards
                </Link>
              </li>
            )}

            <li>
              {authData ? (
                <div className="flex items-center space-x-2">
                  <button
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                    onClick={handleNavigate}
                  >
                    Profile
                  </button>
                  <button
                    className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                  onClick={handleNavigate}
                >
                  LOGIN
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NewNav;
