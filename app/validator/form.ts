/**
 * The function `validateMinLength` checks if a given string value has a length greater than or equal
 * to a specified minimum length.
 * @param {string} value - A string value that needs to be validated.
 * @param {number} length - The `length` parameter in the `validateMinLength` function represents the
 * minimum length that the `value` string should have in order to pass the validation.
 */
export const validateMinLength = (value: string, length: number) => value.length >= length;

/**
 * The function `validateMaxLength` checks if a given string value is within a specified maximum
 * length.
 * @param {string} value - A string value that needs to be validated.
 * @param {number} length - The `length` parameter in the `validateMaxLength` function represents the
 * maximum length that the `value` parameter (a string) is allowed to have. The function checks if the
 * length of the `value` string is less than or equal to the specified `length` value.
 */
export const validateMaxLength = (value: string, length: number) => value.length <= length;

/**
 * The function `validateEmail` checks if a given string is a valid email address.
 * @param {string} email - The `email` parameter is a string that represents an email address. The
 * `validateEmail` function uses a regular expression to check if the email address is in a valid
 * format.
 */
export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * The `validatePassword` function in TypeScript checks if a password meets specific criteria including
 * having at least one uppercase letter, one lowercase letter, one digit, one special character, and a
 * minimum length of 8 characters.
 * @param {string} password - The function `validatePassword` takes a password string as input and
 * checks if it meets the following criteria:
 * @returns The function `validatePassword` returns a boolean value indicating whether the input
 * password meets the specified criteria for a valid password. It checks if the password contains at
 * least one uppercase letter, one lowercase letter, one digit, one special character, and has a
 * minimum length of 8 characters. If all these conditions are met, the function returns `true`,
 * otherwise it returns `false`.
 */
export const validatePassword = (password: string) => {
	return /[A-Z]/.test(password) && // Au moins une majuscule
			/[a-z]/.test(password) && // Au moins une minuscule
			/[0-9]/.test(password) && // Au moins un chiffre
			/[^A-Za-z0-9]/.test(password) && // Au moins un caractère spécial
			password.length >= 8; // Longueur minimale
};

/**
 * The function `validateRequired` checks if a string value is not empty after trimming.
 * @param {string} value - The `value` parameter in the `validateRequired` function is expected to be a
 * string that needs to be validated for being non-empty after trimming any leading or trailing
 * whitespace.
 */
export const validateRequired = (value: string) => value.trim() !== '';