"use client"

import { useState } from "react";

import Input from "@/app/components/Input";
import Select from "@/app/components/Select";
import Button from "@/app/components/Button";
import { Option } from "@/app/types";

const Contact = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
		subject: "general", // Valeur par défaut pour le sujet
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Envoi du formulaire ici (par exemple à un serveur)
		console.log(formData);

		setIsSubmitted(true);
		setIsLoading(false);
	};

	const subjectOptions: Option<string>[] = [
		{ label: "Général", value: "general" },
		{ label: "Problème technique", value: "technical" },
		{ label: "Feedback", value: "feedback" },
	];

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold text-center mb-6">Contactez-nous</h1>
			
			<p className="text-lg text-gray-700 mb-6 text-justify">
				Vous avez des questions ou des commentaires ? N'hésitez pas à nous envoyer un message via ce
				formulaire, et nous reviendrons vers vous dans les plus brefs délais.
			</p>
			
			{isSubmitted ? (
				<div className="text-center text-green-600">
					<p>Merci pour votre message ! Nous reviendrons vers vous sous peu.</p>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<Input
								disabled={isLoading}
								id="name"
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="w-full"
								required
								label="Nom"
							/>
						</div>

						<div>
							<Input
								disabled={isLoading}
								id="email"
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full"
								required
								label="Email"
							/>
						</div>

						<div>
							<Input
								disabled={isLoading}
								id="message"
								type="textarea"
								name="message"
								value={formData.message}
								onChange={handleChange}
								rows={6}
								label="Message"
								required
							/>
						</div>

						<div>
							<Select
								disabled={isLoading}
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								options={subjectOptions}
								className="w-full"
								label="Sujet"
								defaultValue="general"
							/>
						</div>

						<Button
							type="submit"
							variant="primary"
							size="medium"
							loading={isLoading}
							disabled={formData.email === "" || formData.message === "" || formData.name === ""}
						>
							Envoyer
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}

export default Contact;
