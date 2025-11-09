import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem("darkMode");
		return saved ? JSON.parse(saved) : false;
	});

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
