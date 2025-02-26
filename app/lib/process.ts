import fs from "fs"
import path from "path"
import crypto, { createHmac } from "crypto"
import { v4 as uuid } from "uuid"

import { EnvKey, EnvRow } from "../types"

const envPath: string = path.join(path.resolve(), "app/lib/env.config");


/**
 * The function `toEnvRow` takes a string of data, splits it into rows, and creates an array of objects
 * with key-value pairs.
 * @param {string} data - The `data` parameter is a string containing environment variable key-value
 * pairs separated by newline characters. The function `toEnvRow` splits this string into individual
 * lines and then further splits each line into key and value pairs based on the equal sign (=)
 * delimiter. Finally, it returns an array of objects
 * @returns An array of objects of type EnvRow is being returned. Each object contains a key and a
 * value property based on the input data provided.
 */
const toEnvRow = (data: string): EnvRow[] => {
	const data_splited: string[] = data.split("\n");

	const result: EnvRow[] = [];

	data_splited.forEach((line: string) => {
		if (line.length !== 0) {
			const line_splited: any[]= line.split("=");

			result.push({
				key: line_splited[0],
				value: line_splited[1],
			});
		}
	});

	return result
}


/**
 * The function `toString` takes an array of `EnvRow` objects and returns a string representation of
 * key-value pairs separated by newline characters.
 * @param {EnvRow[]} data - `data` is an array of objects where each object represents a row in an
 * environment configuration. Each object has a `key` property representing the configuration key and a
 * `value` property representing the configuration value.
 * @returns The `toString` function is returning a string that contains each `key=value` pair from the
 * `EnvRow` array `data`, with each pair separated by a new line character `\n`.
 */
const toString = (data: EnvRow[]): string => {
	let result: string = "";
	
	data.forEach((row: EnvRow) => {
		result += `${row.key}=${row.value}\n`;
	});
	
	return result;
}


/**
 * The function `getEnvContent` reads the content of a file and converts it into an array of `EnvRow`
 * objects.
 * @returns The function `getEnvContent` is returning an array of `EnvRow` objects.
 */
export const getEnvContent = (): EnvRow[] => {
	const data: string = fs.readFileSync(envPath, "utf-8");

	return toEnvRow(data);
}


/**
 * The function `setEnvContent` writes the content of an array of `EnvRow` objects to a file specified
 * by `envPath`.
 * @param {EnvRow[]} data - An array of objects representing rows of environment variables.
 * @returns The function `setEnvContent` is returning a boolean value, specifically `true`.
 */
export const setEnvContent = (data: EnvRow[]): boolean => {
	let result: string = toString([...new Set(data)]);

	fs.writeFileSync(envPath, result, "utf-8");

	return true;
}


/**
 * The function `rowExists` checks if a specific keyword exists in an array of objects based on a
 * specified key.
 * @param {EnvRow[]} env - An array of objects representing environment variables, where each object
 * has a `key` property.
 * @param {EnvKey} keyword - The `keyword` parameter is a variable representing the key that you are
 * searching for within the array of `EnvRow` objects.
 * @returns The function `rowExists` returns a boolean value indicating whether a row with the
 * specified keyword exists in the array of environment rows (`env`).
 */
export const rowExists = (env: EnvRow[], keyword: EnvKey): boolean => {
	return env.find((row: EnvRow) => row.key === keyword) !== undefined
}


/**
 * The function `findRow` searches for a specific row in an array of `EnvRow` objects based on a given
 * `keyword` of type `EnvKey`.
 * @param {EnvRow[]} env - An array of objects representing environment variables, where each object
 * has a `key` property.
 * @param {EnvKey} keyword - The `keyword` parameter is a variable representing the specific key that
 * you are searching for within the `env` array.
 * @returns The `findRow` function is returning an `EnvRow` object that matches the specified `keyword`
 * in the `env` array.
 */
export const findRow = (env: EnvRow[], keyword: EnvKey): EnvRow => {
	return env.find((row: EnvRow) => row.key === keyword)!;
}


/**
 * The function `generateOrGetSecretKey` generates a secret key if it doesn't already exist in the
 * environment variables.
 * @returns The `generateOrGetSecretKey` function returns the value of the "HASH_SECRET" key from the
 * environment variables after ensuring that it exists. If the "HASH_SECRET" key does not exist in the
 * environment variables, a new key-value pair is added with a randomly generated UUID hashed using
 * SHA-256 algorithm. Finally, the function returns the value associated with the "HASH_SECRET" key.
 */
export const generateOrGetSecretKey = (): string => {
	const env: EnvRow[] = getEnvContent();

	if (!rowExists(env, "HASH_SECRET")) {
		env.push({
			key: "HASH_SECRET",
			value: sha256(uuid())
		});

		setEnvContent(env);
	}

	return findRow(env, "HASH_SECRET").value;
}


/**
 * The function `sha256` calculates the SHA-256 hash of a given string with an optional secret key.
 * @param {string} data - The `data` parameter is the string that you want to hash using the SHA-256
 * algorithm.
 * @param {string} [secret] - The `secret` parameter is an optional string that can be provided to add
 * an additional layer of security when generating the SHA-256 hash. If a `secret` is provided, it will
 * be used in the HMAC (Hash-based Message Authentication Code) process along with the `data` string to
 * create
 * @returns The `sha256` function is returning a string, which is the result of hashing the `data`
 * string using the SHA-256 algorithm with an optional `secret` string as the key.
 */
const sha256 = (data: string, secret?: string): string => {
	return createHmac("sha256", secret ? secret : "")
			.update(data)
			.digest("hex");
}


/**
 * The hash function takes a string input, generates a secret key, and returns the SHA-256 hash of the
 * input using the secret key.
 * @param {string} data - The `data` parameter in the `hash` function is a string that represents the
 * input data that you want to hash using the SHA-256 algorithm with a secret key.
 * @returns The `hash` function is returning a hashed version of the input `data` string using the
 * SHA-256 algorithm with a secret key generated by the `generateOrGetSecretKey` function.
 */
export const hash = (data: string): string => {
	const hashKey: string = generateOrGetSecretKey();
	
	return sha256(data, hashKey);
}


/**
 * The hashVerify function in TypeScript compares the SHA-256 hash of data with a given hash using a
 * secret key.
 * @param {string} data - Data is the string that needs to be verified with the hash.
 * @param {string} hash - The `hash` parameter is a string that represents the hash value generated
 * from the `data` parameter using the `sha256` hashing algorithm with a secret key. The `hashVerify`
 * function compares this generated hash with the provided `hash` parameter to verify the integrity of
 * the data.
 * @returns The function `hashVerify` returns a boolean value, indicating whether the hash of the
 * provided data matches the given hash value.
 */
export const hashVerify = (data: string, hash: string): boolean => {
	const hashKey: string = generateOrGetSecretKey();

	return sha256(data, hashKey) === hash;
}
