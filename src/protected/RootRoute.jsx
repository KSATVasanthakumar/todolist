import React from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Route, Routes } from "react-router-dom";
import Features from "../screens/Features";
import Home from "../screens/Home";
import Details from "../screens/Details";
import Login from "../screens/Login";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeProvider } from "../context/ThemeContext";
import Roles from "../screens/Roles";

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
						<Route path='roles' element={<Roles />} />
						<Route path='details/:id' element={<Details />} />
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
