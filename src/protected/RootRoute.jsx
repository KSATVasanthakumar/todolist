import React from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Route, Routes } from "react-router-dom";
import Features from "../screens/Features";
import Home from "../screens/Home";
import Task from "../screens/Task";
import Details from "../screens/Details";
import Login from "../screens/Login";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeProvider } from "../context/ThemeContext";

const RootRoute = () => {
	const { isloggedin } = useAuth();
	return (
		<>
			<ThemeProvider>
				{isloggedin && <Header />}
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path='/' element={<Home />} />
						<Route path='features' element={<Features />} />
						<Route path='tasks' element={<Task />} />
						<Route path='details' element={<Details />} />
					</Route>

					<Route element={<PublicRoute />}>
						<Route path='login' element={<Login />} />
					</Route>
				</Routes>
			</ThemeProvider>
		</>
	);
};

export default RootRoute;
