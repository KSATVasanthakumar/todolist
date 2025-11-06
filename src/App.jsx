import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import ProtectedRoute from "./protected/ProtectedRoute";
import PublicRoute from "./protected/PublicRoute";
import Login from "./screens/Login";
import Features from "./screens/Features";
import Task from "./screens/Task";
import Details from "./screens/Details";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import RootRoute from "./protected/RootRoute";

const App = () => {
	return (
		<AuthProvider>
			<RootRoute />
		</AuthProvider>
	);
};

export default App;
