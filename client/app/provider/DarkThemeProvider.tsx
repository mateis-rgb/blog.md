"use client";

import { createContext, useContext, useEffect, useState } from "react"

// Création du contexte pour le thème
const DarkThemeContext = createContext<{ theme: string; toggleTheme: () => void } | undefined>(undefined);

export const DarkThemeProvider = ({ children }: { children: React.ReactNode }) => {
	// Vérifier le mode préféré dans localStorage ou par défaut "light"
	const [theme, setTheme] = useState<string>(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("theme") || "light";
		}

		return "light";
	});

	useEffect(() => {
		// Appliquer le mode sombre/claire au HTML
		document.body.classList.toggle("dark", theme === "dark");
		
		// Sauvegarder la préférence utilisateur
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<DarkThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</DarkThemeContext.Provider>
	);
}

// Hook personnalisé pour utiliser le mode sombre
export const useDarkTheme = () => {
	const context = useContext(DarkThemeContext);
	
	if (!context) {
		throw new Error("useDarkTheme must be used within a DarkThemeProvider");
	}
	
	return context;
}
