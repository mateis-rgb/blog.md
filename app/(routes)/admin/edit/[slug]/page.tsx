"use client"

import { useState, useEffect } from "react"
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import Button from "@/app/components/Button";
import CodeBlock from "@/app/components/CodeBlock";
import Input from "@/app/components/Input";
import { HiOutlineDownload, HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
import ReactMarkdown from "react-markdown"
import { validateMaxLength, validateMinLength, validateRequired } from "@/app/validator/form";

type FormDataName = "Title" | "Content" | "Description"

type FormData = {
	Title: string;
	Content: string;
	Description: string;
}

const EditPage = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState<FormData>({ Title: "", Content: "", Description: "" });

	const [errors, setErrors] = useState<FormData>({ Title: "", Content: "", Description: "" });

	// Charger un brouillon stocké en local
	useEffect(() => {
		// const savedTitle = localStorage.getItem("draftTitle");
		// const savedContent = localStorage.getItem("draftContent");
		// const savedDescription = localStorage.getItem("draftDescription");

		// const newFormData: FormData = { 
		// 	Title: localStorage.getItem("draftTitle")!, 
		// 	Content: localStorage.getItem("draftContent")!, 
		// 	Description: localStorage.getItem("draftDescription")!
		// };

		// if (savedDescription) newFormData.Description = savedDescription;
		// if (savedContent) newFormData.Content = savedContent;
		// if (savedTitle) newFormData.Title = savedTitle;

		setFormData({ 
			Title: localStorage.getItem("draftTitle")!, 
			Content: localStorage.getItem("draftContent")!, 
			Description: localStorage.getItem("draftDescription")!
		});
	}, []);

	// Sauvegarde automatique du brouillon
	useEffect(() => {
		localStorage.setItem("draftTitle", formData.Title);
		localStorage.setItem("draftContent", formData.Content);
		localStorage.setItem("draftDescription", formData.Description);
	}, [formData]);

	const handleChange = (e: any) => {
		const { name, value }: { name: FormDataName, value: string } = e.target;

		setFormData({ ...formData, [name]: value});

		const newErrors = { ...errors };

		if (name === "Title") {
			if (!validateRequired(value)) {
				newErrors.Title = 'Ce champ est requis.';
			}
			else if (!validateMinLength(value, 4)) {
				newErrors.Title = 'Le titre doit comporter au moins 4 caractères.'
			}
			else if (!validateMaxLength(value, 50)) {
				newErrors.Title = 'Le titre ne doit pas exceder 50 caractères.'
			}
			else {
				newErrors.Title = "";
			}
		}

		if (name === "Description") {
			if (!validateRequired(value)) {
				newErrors.Description = 'Ce champ est requis.';
			}
			else if (!validateMinLength(value, 4)) {
				newErrors.Description = 'La description doit comporter au moins 4 caractères.'
			}
			else if (!validateMaxLength(value, 255)) {
				newErrors.Description = 'La description ne doit pas exceder 255 caractères.'
			}
			else {
				newErrors.Description = "";
			}
		}

		if (name === "Content") {
			if (!validateRequired(value)) {
				newErrors.Content = 'Ce champ est requis.';
			}
			else if (!validateMinLength(value, 4)) {
				newErrors.Content = 'Le contenu doit comporter au moins 4 caractères.'
			}
			else {
				newErrors.Content = "";
			}
		}

		setErrors(newErrors);
	}

	const add2Blog = () => {
		if (Object.keys(errors).length === 0 && Object.values(formData).every(validateRequired)) {
			console.log("ok");
			console.log(formData);
		}
		else {
			console.log("pas ok, corriger les problèmes")
		}
	}

	// Générer un fichier .md
	const downloadMarkdown = () => {
		setIsLoading(true);

		const blob = new Blob([
			`---\ntitle: "${formData.Title}"\ndescription: "${formData.Description}"\ndate: "${new Date().toISOString()}"\n---\n\n${formData.Content}`,
		], { 
			type: "text/markdown"
		});

		const link = document.createElement("a");

		link.href = URL.createObjectURL(blob);
		link.download = `${formData.Title.replace(/\s+/g, "-").toLowerCase()}.md`;
		link.click();
		
		setIsLoading(false);
	}

	const resetFields = () => {
		setIsLoading(true);

		setFormData({ Title: "", Content: "", Description: "" });

		localStorage.removeItem("draftTitle");
		localStorage.removeItem("draftContent");
		localStorage.removeItem("draftDescription");
		
		setIsLoading(false);
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">📝 Ajouter un article</h1>
			
			<p className="text-gray-500 text-sm mb-4">Toutes les modifications sont enregistrées en temps réel</p>

			{/* Titre */}
			<Input
				id="title"
				type="text"
				name="Title"
				placeholder="Titre de l'article*"
				value={formData.Title}
				onChange={handleChange}
				className="w-full"
				disabled={isLoading}
				required
				error={errors.Title}
			/>

			{/* Description */}
			<Input
				id="description"
				type="text"
				name="Description"
				placeholder="Description de l'article*"
				value={formData.Description}
				onChange={handleChange}
				className="w-full"
				disabled={isLoading}
				required
				error={errors.Description}
			/>

			<div className="grid grid-cols-2 gap-4">
				{/* Éditeur Markdown */}
				<Input
					id="content"
					type="textarea"
					name="Content"
					placeholder="Écris ton article ici..."
					value={formData.Content}
					onChange={handleChange}
					className="w-full h-96 p-2 border rounded-md"
					disabled={isLoading}
					error={errors.Content}
				/>

				{/* Aperçu en temps réel */}
				<div className="w-full h-96 p-4 border rounded-md overflow-auto bg-gray-50 dark:bg-gray-800">
					<h2 className="text-lg font-semibold">📜 Aperçu</h2>

					<ReactMarkdown
						className="prose dark:prose-invert"
						children={formData.Content}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}

						components={{
							code({ node, className, children, ...props }) {
								const language = className?.replace(/language-/, "") || "plaintext";

								return (
									<CodeBlock language={language} value={String(children)} {...props} />
								);
							},
						}}
					/>
				</div>
			</div>

			{/* Boutons */}
			<div className="mt-4 flex gap-4">
				<Button
					loading={isLoading}
					onClick={add2Blog}
					icon={HiOutlineUpload}
					variant="success"
				>
					Ajouter au blog
				</Button>

				<Button
					loading={isLoading}
					onClick={downloadMarkdown}
					icon={HiOutlineDownload}
				>
					Exporter en .md
				</Button>

				<Button
					loading={isLoading}
					onClick={resetFields}
					icon={HiOutlineTrash}
					variant="danger"
					className="ml-auto"
				>
					Réinitialiser
				</Button>
			</div>
		</div>
	);
}

export default EditPage;