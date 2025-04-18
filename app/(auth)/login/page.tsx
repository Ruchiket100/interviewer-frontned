"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { FETCH } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { cloudAtom } from "@/lib/store";

type LoginData = {
	email: string;
	password: string;
};

export default function LoginPage() {
	const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		password: "",
	});
	const router = useRouter();
	const [cloud, setCloud] = useAtom(cloudAtom);

	const loginUserMutation = useMutation({
		mutationFn: async (data: LoginData) => {
			return FETCH.auth.login(data);
		},
		onSuccess: (data) => {
			console.log(data);
			toast("Welcome back! User logged in successfully");
			router.push(`/auth-login?token=${data.token}?redirect=/home`);
		},
	});

	useEffect(() => {
		if (cloud.auth_token) router.push("/home");
	}, [cloud]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Login Data:", loginData);
		// Add API call or form handling here
		loginUserMutation.mutate(loginData);
		// Reset form
		setLoginData({
			email: "",
			password: "",
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setLoginData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="max-w-md w-full space-y-6 p-8 border rounded-2xl shadow-md">
				<div className="text-center">
					<h1 className="text-3xl font-extrabold">Welcome back</h1>
					<p className="text-muted-foreground text-sm mt-2">
						Enter your credentials to log in
					</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
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
							value={loginData.email}
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
							value={loginData.password}
							onChange={handleChange}
						/>
					</div>
					<Button type="submit" className="w-full">
						Log In
					</Button>
				</form>
				<p className="text-center text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="underline text-primary">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
