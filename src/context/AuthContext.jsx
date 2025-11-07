import React, { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [authToken, setAuthToken] = useState(null);
	const [isloggedin, SetLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true); // ✅ Added loading state

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			setAuthToken(JSON.parse(token));
			SetLoggedIn(true);
		}
		setLoading(false); // ✅ Done checking
	}, []);

	useEffect(() => {
		if (authToken) {
			localStorage.setItem("authToken", JSON.stringify(authToken));
		} else {
			localStorage.removeItem("authToken");
		}
	}, [authToken]);

	const value = { isloggedin, SetLoggedIn, authToken, setAuthToken, loading };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
