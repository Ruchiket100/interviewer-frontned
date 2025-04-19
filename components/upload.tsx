"use client";

import { useState } from "react";

const FileUpload = () => {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [message, setMessage] = useState("");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) {
			setMessage("No file selected");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		setUploading(true);
		setMessage("");

		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const result = await res.json();
			if (res.ok) {
				setMessage(`File uploaded: ${result.fileName}`);
			} else {
				setMessage(
					`Upload failed: ${result.message || "Unknown error"}`
				);
			}
		} catch (error) {
			setMessage("Something went wrong");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="p-4 border rounded w-full max-w-md mx-auto">
			<input type="file" onChange={handleFileChange} />
			<button
				onClick={handleUpload}
				disabled={uploading}
				className="bg-blue-600 text-white mt-2 px-4 py-2 rounded disabled:opacity-50"
			>
				{uploading ? "Uploading..." : "Upload"}
			</button>
			{message && <p className="mt-2">{message}</p>}
		</div>
	);
};

export default FileUpload;
