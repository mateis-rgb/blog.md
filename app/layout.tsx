import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

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
		<html lang="fr">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<div className="min-h-screen bg-gray-50 text-gray-900">
					{/* Navbar */}
					<nav className="bg-gray-800 text-white p-4">
						<div className="max-w-7xl mx-auto flex justify-between items-center">
							<h1 className="text-2xl font-semibold">{metadata.title as string}</h1>
							
							<ul className="flex space-x-6">
								<li><a href="/" className="hover:text-blue-300">Accueil</a></li>
								<li><a href="/about" className="hover:text-blue-300">À propos</a></li>
								<li><a href="/contact" className="hover:text-blue-300">Contact</a></li>
							</ul>
						</div>
					</nav>

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
	);
}

export default RootLayout;
