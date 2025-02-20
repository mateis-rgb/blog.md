"use client"

import { useState, useEffect } from "react"
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import Button from "@/app/components/Button";
import CodeBlock from "@/app/components/CodeBlock";
import Input from "@/app/components/Input";
import { HiOutlineDownload, HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
import ReactMarkdown from "react-markdown"

const EditPage = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");

	// Charger un brouillon stocké en local
	useEffect(() => {
		const savedTitle = localStorage.getItem("draftTitle");
		const savedContent = localStorage.getItem("draftContent");
		const savedDescription = localStorage.getItem("draftDescription");

		if (savedTitle) setTitle(savedTitle);
		if (savedContent) setContent(savedContent);
		if (savedDescription) setDescription(savedDescription);
	}, []);

	// Sauvegarde automatique du brouillon
	useEffect(() => {
		localStorage.setItem("draftTitle", title);
		localStorage.setItem("draftContent", content);
		localStorage.setItem("draftDescription", description);
	}, [title, content, description]);

	const add2Blog = () => {
		
	}

	// Générer un fichier .md
	const downloadMarkdown = () => {
		const blob = new Blob([
			`---\ntitle: "${title}"\ndescription: "${description}"\ndate: "${new Date().toISOString()}"\n---\n\n${content}`,
		], { 
			type: "text/markdown"
		});

		const link = document.createElement("a");

		link.href = URL.createObjectURL(blob);
		link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.md`;
		link.click();
	}

	const resetFields = () => {
		setTitle("");
		setContent("");
		setDescription("");

		localStorage.removeItem("draftTitle");
		localStorage.removeItem("draftContent");
		localStorage.removeItem("draftDescription");
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">📝 Ajouter un article</h1>
			
			<p className="text-gray-500 text-sm mb-4">Toutes les modifications sont enregistrées en temps réel</p>

			{/* Titre */}
			<Input
				id="title"
				type="text"
				placeholder="Titre de l'article*"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="w-full mb-4"
				disabled={isLoading}
				required
			/>

			{/* Description */}
			<Input
				id="title"
				type="text"
				placeholder="Description de l'article*"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="w-full mb-4"
				disabled={isLoading}
				required
			/>

			<div className="grid grid-cols-2 gap-4">
				{/* Éditeur Markdown */}
				<Input
					id="content"
					type="textarea"
					placeholder="Écris ton article ici..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full h-96 p-2 border rounded-md"
					disabled={isLoading}
				/>

				{/* Aperçu en temps réel */}
				<div className="w-full h-96 p-4 border rounded-md overflow-auto bg-gray-50 dark:bg-gray-800">
					<h2 className="text-lg font-semibold">📜 Aperçu</h2>

					<ReactMarkdown
						className="prose dark:prose-invert"
						children={content}
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