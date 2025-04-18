"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { FETCH } from "@/lib/fetch";
import { useAtom } from "jotai";
import { cloudAtom } from "@/lib/store";

type RegisterData = {
	name: string;
	email: string;
	password: string;
};

export default function RegisterPage() {
	const [registerData, setRegisterData] = useState<RegisterData>({
		name: "",
		email: "",
		password: "",
	});
	const router = useRouter();
	const [cloud] = useAtom(cloudAtom);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setRegisterData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const registerUser = useMutation({
		mutationFn: async (data: RegisterData) => {
			return FETCH.auth.register(data);
		},
		onSuccess: (data) => {
			console.log(data);
			toast("Welcome aboard! User registered successfully");
			router.push(`/auth-login?token=${data.token}?redirect=/home`);
		},
	});

	useEffect(() => {
		if (!!cloud.auth_token) router.push("/home");
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Register Data:", registerData);
		registerUser.mutate(registerData);
		setRegisterData({
			name: "",
			email: "",
			password: "",
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="max-w-md w-full space-y-6 p-8 border rounded-2xl shadow-md">
				<div className="text-center">
					<h1 className="text-3xl font-extrabold">
						Create an account
					</h1>
					<p className="text-muted-foreground text-sm mt-2">
						Enter your details to sign up
					</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium mb-1"
						>
							Name
						</label>
						<Input
							id="name"
							placeholder="Your name"
							value={registerData.name}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium mb-1"
						>
							Email
						</label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={registerData.email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium mb-1"
						>
							Password
						</label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							showPasswordToggle
							value={registerData.password}
							onChange={handleChange}
						/>
					</div>
					<Button
						disabled={registerUser.isLoading}
						type="submit"
						className="w-full"
					>
						Register
					</Button>
				</form>
				<p className="text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link href="/login" className="underline text-primary">
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}
