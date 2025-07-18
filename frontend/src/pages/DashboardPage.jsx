import React from "react";
import { useAuthStore } from "../store/authStore";

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  // IST time formatting
  const istTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Splitting date and time for better layout
  const [datePart, timePart] = istTime.split(", ").reduce(
    (acc, part, index) => {
      if (index < 2) acc[0] += (acc[0] ? ", " : "") + part;
      else acc[1] += (acc[1] ? ", " : "") + part;
      return acc;
    },
    ["", ""]
  );

  return (
    <div className="min-h-screen w-full bg-[#1E1E2F] text-white p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome {user?.name || "User"} 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Here’s an overview of your activity
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-300">📅 {datePart}</p>
          <p className="text-sm text-gray-300">⏰ {timePart}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Info */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2">Account Info</h2>
          <p className="text-sm text-gray-300">
            Name: <span className="text-white">{user?.name || "N/A"}</span>
          </p>
          <p className="text-sm text-gray-300">
            Email: <span className="text-white">{user?.email || "N/A"}</span>
          </p>
        </div>

        {/* Email Verification */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2">Email Verification</h2>
          <p className="text-sm text-gray-300">
            {user?.isVerified
              ? "✅ Your email is verified."
              : "❌ Your email is not verified."}
          </p>
        </div>

        {/* Role */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2">Role</h2>
          <p className="text-sm text-gray-300">
            You are logged in as{" "}
            <span className="text-white font-semibold">
              {user?.role || "User"}
            </span>
          </p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-sm text-gray-300">
            Last login: {user?.lastLogin || "N/A"}
          </p>
        </div>

        {/* Logout */}
        <div className="bg-white/10  backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
          <button
            onClick={handleLogout}
            className="bg-[#B2CD9C] hover:bg-[#a1ba8b] text-[#1E1E2F] font-medium py-2 px-4 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Auth Dashboard. All rights reserved.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
