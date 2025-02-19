import { Option, SelectProps } from "../types";

const Select: React.FC<SelectProps> = ({
	variant = "primary",
	size = "medium",
	loading = false,
	label,
	disabled,
	defaultValue,
	options,
	className = "",
	...props
}) => {
	const baseClasses = "px-3 py-2 border rounded-lg focus:outline-none transition-all duration-200";

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
			{label && <label className="text-sm text-gray-700">{label}</label>}
			
			<div className="relative">
				<select
					className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`}
					disabled={disabled || loading}
					defaultValue={defaultValue}
					{...props}
				>
					{ options.some((option) => {
						return (option.label == defaultValue) || (option.value == defaultValue)
					}) === true ? "" : (
						<option value="default">{ defaultValue }</option>
					) }

					{/* Rendu dynamique des options depuis le tableau options */}
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				
				{loading && <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-gray-500">⏳</div>}
			
			</div>
		</div>
	);
};

export default Select;
