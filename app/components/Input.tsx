import { InputProps } from "../types";

const Input: React.FC<InputProps> = ({
	variant = "primary",
	size = "medium",
	icon: Icon,
	iconPosition = "left",
	loading = false,
	label,
	disabled,
	className = "",
	id,
	type,
	rows,
	...props
}) => {
	const baseClasses = "flex items-center px-3 py-2 border rounded-lg focus:outline-none transition-all duration-200";

	const sizeClasses = {
		small: "text-sm",
		medium: "text-base",
		large: "text-lg",
	}[size];

	const variantClasses = {
		primary: "bg-white text-gray-800 border-gray-300 focus:ring-2 focus:ring-blue-600",
		secondary: "bg-gray-100 text-gray-800 border-gray-300 focus:ring-2 focus:ring-gray-600",
		outline: "bg-transparent text-gray-700 border-gray-500 focus:ring-2 focus:ring-gray-400",
	}[variant];

	const disabledClasses = disabled || loading ? "opacity-50 cursor-not-allowed" : "";

	return (
		<div className="flex flex-col space-y-1">
			{label && <label htmlFor={id} className="text-sm text-gray-700">{label}</label>}
			
			<div className="relative">
				{ type === "textarea" ? (
					// @ts-ignore
					<textarea
						rows={rows}
						id={id}
						name="message"
						className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`}
						required
						{...props}
					/>
				) : (
					<>
						<input
							id={id}
							className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`}
							disabled={disabled || loading}
							{...props}
						/>
						
						{loading && <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-gray-500">⏳</div>}
						
						{Icon && iconPosition === "left" && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
						
						{Icon && iconPosition === "right" && <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
					</>
				) }
			</div>
		</div>
	);
};

export default Input;
