import { IconType } from "react-icons";

export type Sort = "recent" | "ancient" | "default";

export interface HomeClientProps {
	allPosts: any;
	allCategories: any;
}

export interface DisplayArticleProps {
	posts: any[];
}

export interface CodeBlockProps {
	language: string;
	value: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "danger" | "outline";
	size?: "small" | "medium" | "large";
	icon?: IconType;
	iconPosition?: "left" | "right";
	loading?: boolean;
	type?: "button" | "reset" | "submit" | "link";
	href?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: "primary" | "secondary" | "outline";
	size?: "small" | "medium" | "large";
	icon?: IconType;
	iconPosition?: "left" | "right";
	loading?: boolean;
	label?: string;
	id: string;
	type?: string;
	rows?: number;
}

export interface Option<T> {
	label: string;
	value: T;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	variant?: "primary" | "secondary" | "outline";
	size?: "small" | "medium" | "large";
	label?: string;
	loading?: boolean;
	defaultValue?: string;
	options: Option<T>[];
}