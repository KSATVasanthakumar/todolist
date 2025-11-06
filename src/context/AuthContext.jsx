import React, { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [authToken, setAuthToken] = useState(null);
	const [isloggedin, SetLoggedIn] = useState(false);

	// ✅ Load token when app starts (runs only once)
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			setAuthToken(JSON.parse(token));
			SetLoggedIn(true);
		}
	}, []);

	// ✅ Whenever token changes, save/remove from localStorage
	useEffect(() => {
		if (authToken) {
			localStorage.setItem("authToken", JSON.stringify(authToken));
		} else {
			localStorage.removeItem("authToken");
		}
	}, [authToken]);

	const value = { isloggedin, SetLoggedIn, authToken, setAuthToken };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
