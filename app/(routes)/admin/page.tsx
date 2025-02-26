"use client"

import { getAllPosts } from "@/app/lib/posts"
import { isAdminConnected, isAdminDefined } from "@/app/lib/auth"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

import AdminClient from "./AdminClient"
import Button from "@/app/components/Button"

type FormData = {
	username: string;
	password: string;
}

type IsLoginType = "Login" | "Register";

const AdminPage = () => {
	const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [isLogin, setIsLogin] = useState<IsLoginType>("Login");
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await axios.post("/api/login")
	}

	return (
		<div>
			<h1 className="text-2xl font-bold">{isLogin === "Login" ? "Se connecter" : "Première connexion..."}</h1>

			{ isLogin === "Register" }

			<form method="post" onSubmit={handleSubmit}>
				<Button type="submit">Click Here</Button>
			</form>
		</div>
	);

	// const posts = getAllPosts();
	// return <AdminClient posts={posts} />
}

export default AdminPage;
