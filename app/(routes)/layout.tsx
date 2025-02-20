import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import clsx from "clsx"

import Link from "next/link"
import NextTopLoader from "nextjs-toploader"
import { DarkThemeProvider } from "@/app/provider/DarkThemeProvider"
// import DarkModeToggle from "@/app/components/DarkThemeToggle"

import "./globals.css"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Blog.md",
	description: "Blog.md - Markdown blog",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<DarkThemeProvider>
			<html lang="fr">
				<head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
					<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
				</head>

				<body className={clsx(
					geistSans.variable, 
					geistMono.variable,
					"antialiased"
				)}>
					<div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-blue-950 dark:text-gray-50">
						{/* Navbar */}
						<nav className="bg-gray-800 text-white p-4">
							<div className="max-w-7xl mx-auto flex justify-between items-center">
								<h1 className="text-2xl font-semibold">{metadata.title as string}</h1>
								
								<ul className="flex space-x-6">
									<li><Link href="/" className="hover:text-blue-300">Accueil</Link></li>
									<li><Link href="/categories" className="hover:text-blue-300">Catégories</Link></li>
									<li><Link href="/about" className="hover:text-blue-300">À propos</Link></li>
									<li><Link href="/contact" className="hover:text-blue-300">Contact</Link></li>
								</ul>
							</div>
						</nav>

						<NextTopLoader showSpinner={false} />

						{/* <DarkModeToggle /> */}

						{/* Main content */}
						<main className="max-w-7xl h-full mx-auto px-4 py-8">
							{children}
						</main>

						{/* Footer */}
						<footer className="bg-gray-800 text-white text-center py-4 fixed bottom-0 w-full">
							<p>© 2025 {metadata.title as string}. Tous droits réservés.</p>
						</footer>
					</div>
				</body>
			</html>
		</DarkThemeProvider>
	);
}

export default RootLayout;
