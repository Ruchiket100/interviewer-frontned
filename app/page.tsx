"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
	const router = useRouter();

	return (
		<div className="flex min-h-screen min-w-screen items-center justify-center">
			<Button
				onClick={() => router.push("/register")}
				variant={"default"}
			>
				Login/Register
			</Button>
		</div>
	);
};

export default page;
