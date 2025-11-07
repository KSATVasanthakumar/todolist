import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(
		() => localStorage.getItem("darkMode") === "false"
	);

	useEffect(() => {
		localStorage.setItem("darkMode", darkMode);
	}, [darkMode]);

	const toggle = () => setDarkMode((prev) => !prev);

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
};
