import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const ProtectedRoute = () => {
	const { isloggedin, loading } = useAuth();
	const { darkMode } = useTheme();

	// 🕐 Wait until token check finishes
	if (loading) {
		return <div className='text-center py-10 text-gray-500'>Loading...</div>;
	}

	// 🚫 If not logged in, redirect
	if (!isloggedin) {
		return <Navigate to='/login' replace />;
	}

	// ✅ Otherwise show protected routes
	return (
		<div
			className={`flex min-h-screen  ${
				darkMode ? "bg-black text-white" : "bg-white text-black"
			}`}
		>
			<Outlet />
		</div>
	);
};

export default ProtectedRoute;
