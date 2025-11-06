import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
	const { isloggedin } = useAuth();

	// ✅ If not logged in, redirect
	if (!isloggedin) {
		return <Navigate to='/login' replace />;
	}

	// ✅ Otherwise, show protected component
	return <Outlet />;
};

export default ProtectedRoute;
