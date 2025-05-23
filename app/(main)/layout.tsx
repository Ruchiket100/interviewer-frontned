import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full flex gap-6 min-h-screen p-6 mx-auto">
			<Sidebar />
			{children}
		</div>
	);
}
