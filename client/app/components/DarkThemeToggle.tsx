"use client";

import { useDarkTheme } from "../provider/DarkThemeProvider"

import { IoSunny, IoMoon } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"

const DarkModeToggle = () => {
	const { theme, toggleTheme } = useDarkTheme();

	return (
		<button
			onClick={toggleTheme}
			className="fixed bottom-16 right-2 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition-all"
		>
			<AnimatePresence mode="wait">
				{theme === "light" ? (
					<motion.div
						key="light"
						initial={{ opacity: 0, rotate: -90 }}
						animate={{ opacity: 1, rotate: 0 }}
						exit={{ opacity: 0, rotate: 90 }}
					>
						<IoSunny className="text-yellow-500 text-2xl" />
					</motion.div>
				) : (
					<motion.div
						key="dark"
						initial={{ opacity: 0, rotate: 90 }}
						animate={{ opacity: 1, rotate: 0 }}
						exit={{ opacity: 0, rotate: -90 }}
					>
						<IoMoon className="text-blue-300 text-2xl" />
					</motion.div>
				)}
			</AnimatePresence>
		</button>
	);
}

export default DarkModeToggle;