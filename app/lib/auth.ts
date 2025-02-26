import { cookies } from "next/headers";
import { EnvRow } from "../types"
import { findRow, getEnvContent, hash, rowExists } from "./process"
import { NextApiRequest, NextApiResponse } from "next";


export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}
			
			return resolve(result);
		});
	});
}


/**
 * The function checks if the environment variables for admin username and password are defined.
 * @returns The function `isAdminDefined` returns a boolean value. It returns `true` if both
 * "ADMIN_USERNAME" and "ADMIN_PASSWORD" exist in the environment rows, otherwise it returns `false`.
 */
export const isAdminDefined = (): boolean => {
	const env: EnvRow[] = getEnvContent();

	if (rowExists(env, "ADMIN_USERNAME") && rowExists(env, "ADMIN_PASSWORD")) return true;

	return false;
}


/**
 * The function `isAdminConnected` checks if an admin user is connected by retrieving a token from
 * cookies.
 * @returns The function `isAdminConnected` returns a Promise that resolves to a boolean value. It
 * checks if a token is present in the cookie store and returns `true` if a token exists, otherwise it
 * returns `false`.
 */
export const isAdminConnected = async (): Promise<boolean> => {
	const cookieStore = await cookies();

	const token = cookieStore.get("token");

	if (!token) return false;
	
	return true
}


const setCookie = async (key: string, value: string): Promise<boolean> => {
	const cookieStore = await cookies();

	const set = cookieStore.set(key, value);

	if (set) return true;

	return false;
}


export const login = async (email: string, password: string): Promise<boolean> => {
	const hashpass = hash(password);

	const env: EnvRow[] = getEnvContent();

	if (rowExists(env, "ADMIN_USERNAME") && rowExists(env, "ADMIN_PASSWORD")) {
		const env_email: string = findRow(env, "ADMIN_USERNAME").value;
		const env_password: string = findRow(env, "ADMIN_PASSWORD").value;

		if (env_email === email && env_password === hashpass) {
			return await setCookie("token", hash(env_email + "_" + env_password));
		}
	}

	return false;
}


export const register = (email: string, password: string): boolean => {
	const hashpass = hash(password);

	return false;
}


export const logout = () => {}