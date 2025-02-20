import { FiLoader } from "react-icons/fi"; // Spinner par défaut
import { ButtonProps } from "../types";
import Link from "next/link";

const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	size = "medium",
	icon: Icon,
	iconPosition = "left",
	loading = false,
	disabled,
	className = "",
	type,
	href,
	...props
}) => {
	const baseClasses = "flex items-center justify-center font-medium rounded-lg transition-all duration-200";
	
	const sizeClasses = {
		small: "px-3 py-1 text-sm",
		medium: "px-4 py-2 text-base",
		large: "px-6 py-3 text-lg",
	}[size];

	const variantClasses = {
		primary: "bg-blue-600 text-white hover:bg-blue-700",
		secondary: "bg-gray-600 text-white hover:bg-gray-700",
		danger: "bg-red-600 text-white hover:bg-red-700",
		success: "bg-green-600 text-white hover:bg-green-700",
		outline: "border border-gray-500 text-gray-700 hover:bg-gray-200",
	}[variant];

	const disabledClasses = disabled || loading ? "opacity-50 cursor-not-allowed" : "";

	return (
		<button
			type={ type === "link" ? "button" : type }
			className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`}
			disabled={disabled || loading}
			{...props}
		>
			{loading && <FiLoader className="animate-spin mr-2" />} {/* Icône de chargement */}

			{Icon && iconPosition === "left" && <Icon className="mr-2" />} {/* Icône à gauche */}
			{ type === "link" && href ? (
				<Link href={href}>{ children }</Link>
			) : children }
			
			{Icon && iconPosition === "right" && <Icon className="ml-2" />} {/* Icône à droite */}
		</button>
	);
};

export default Button;

