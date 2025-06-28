"use client"

import { useEffect, useState } from "react"

import Button from "@/app/components/Button"
import Input from "@/app/components/Input"
import { useRouter } from "next/navigation";

type FormDataName = "username" | "password";

type FormData = {
	username: string;
	password: string;
}

type IsLoginType = "Login" | "Register";

const API_URL = "http://localhost:1234/api"; 

const Auth = () => {
	const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
	const [errors, setErrors] = useState<FormData>({ username: "", password: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [isLogin, setIsLogin] = useState<IsLoginType>("Login");

	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (sessionStorage.getItem("token")) {
				const data = JSON.stringify({ token: sessionStorage.getItem("token") });

				const request_connected = await fetch(`${API_URL}/auth/verify`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: data
				});
				const response_connected = await request_connected.status;

				if (response_connected === 200) {
					router.push("/admin");

					return;
				}
			}

			const request_auth = await fetch(`${API_URL}/auth`);
			const response_auth = await request_auth.status;

			if (response_auth === 200) {
				setIsLogin("Login");
			}
			else {
				setIsLogin("Register");
			}
		})();
	}, [setIsLogin]);
	

	const handleChange = (e: any) => {
		const { name, value }: { name: FormDataName, value: string } = e.target;

		setFormData({ ...formData, [name]: value});
	}


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const data = JSON.stringify(formData);

		const request = await fetch(`${API_URL}/auth/${isLogin.toLowerCase()}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: data
		});
		const status = await request.status;
		const response = await request.json();

		if (status === 200) {
			sessionStorage.setItem("token", response.token);

			router.push("/admin");
		}
	}


	return (
		<div className="max-w-full md:px-24 lg:px-96">
			<h1 className="text-2xl font-bold mb-8">{isLogin === "Login" ? "Se connecter" : "Première connexion..."}</h1>

			<form method="post" onSubmit={handleSubmit}>
				<Input
					className="w-full"
					type="email"
					id="username"
					name="username"
					label="Email :"
					placeholder="john@doe.fr"
					error={errors.username}
					onChange={handleChange}
					loading={isLoading}
				/>

				<Input
					className="w-full"
					id="password"
					name="password"
					type="password"
					label="Mot de passe :"
					placeholder="••••••••"
					error={errors.password}
					onChange={handleChange}
					loading={isLoading}
				/>
				
				<Button className="mt-8" type="submit">
					{ isLogin === "Login" ? "Se connecter" : "S'enregistrer" }
				</Button>
			</form>
		</div>
	);
}

export default Auth;
