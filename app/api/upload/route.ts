import axios from "axios";
import Error from "next/error";

function getDateTime6Digit() {
	const date = new Date();

	// Extract date and time components
	const day = date.getDate(); // e.g., 1-31
	const hours = date.getHours(); // e.g., 0-23
	const minutes = date.getMinutes(); // e.g., 0-59
	const seconds = date.getSeconds(); // e.g., 0-59

	// Combine them into a 6-digit number
	const uniqueNumber = `${String(day).padStart(2, "0")}${String(
		hours
	).padStart(2, "0")}${String(minutes).padStart(2, "0")}`;

	return parseInt(uniqueNumber, 10); // Return as a number
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return new Response(JSON.stringify({ error: "No file uploaded" }), {
				status: 400,
			});
		}

		const arrayBuffer = await file.arrayBuffer();
		const base64Content = Buffer.from(arrayBuffer).toString("base64");

		const repoOwner = "ruchiket100";
		const repoName = "verbose-meme-cdn";
		const filePath = `path/in/repo/${getDateTime6Digit()}-${file.name}`;
		const githubToken = process.env.GITHUB_TOKEN;

		if (!githubToken) {
			return new Response(
				JSON.stringify({ error: "no token provided" }),
				{ status: 400 }
			);
		}

		//make request to github
		const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
		// Prepare the payload
		const payload = {
			message: `Upload ${file.name}`,
			committer: {
				name: "ruchiket",
				email: "ruchiketborse1@gmail.com",
			},
			content: base64Content,
		};

		// Make the request to GitHub
		const response = await axios.put(url, payload, {
			headers: {
				Authorization: `Bearer ${githubToken}`,
			},
		});
		if (response.data) {
			const name = response.data.content.name;

			const jsdelivr = `https://cdn.jsdelivr.net/gh/Ruchiket100/verbose-meme-cdn@main/path/in/repo/${name}`;
			return new Response(
				JSON.stringify({
					message: "File uploaded successfully",
					data: { url: jsdelivr },
				}),
				{ status: 200 }
			);
		}
	} catch (error: any) {
		console.error(error);
		return new Response(
			JSON.stringify({
				error: "Failed to upload file",
				details: error.message,
			}),
			{ status: 500 }
		);
	}
}
