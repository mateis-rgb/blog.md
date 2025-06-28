"use client"

import { getAllPosts } from "@/app/lib/posts"
import { useEffect, useState } from "react"

import AdminClient from "./AdminClient"

const API_URL = "http://localhost:1234/api"; 

const AdminPage = () => {
	useEffect(() => {
		(async () => {
			if (sessionStorage.getItem("token") === null) {
				window.location.href = "/auth";

				return;
			}

			const data = JSON.stringify({ token: sessionStorage.getItem("token") });

			const request_connected = await fetch(`${API_URL}/auth/verify`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: data
			});
			const response_connected = await request_connected.status;

			if (response_connected !== 200) {
				window.location.href = "/auth";

				return;
			}
			
		
		})();
	}, []);

	return <div>toto</div>;

	// const posts = getAllPosts();

	// return <AdminClient posts={posts} />
}

export default AdminPage;
