"use client";

import { ToastContainer } from "react-toastify";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { cloudAtom } from "@/lib/store";
import QueryProvider from "./queryProviders";
import AuthProvider from "./authProviders";

export default function Providers({
	children,
	cloud,
}: {
	children: React.ReactNode;
	cloud: any;
}) {
	useHydrateAtoms([[cloudAtom, cloud]]);

	return (
		<>
			<QueryProvider>
				<AuthProvider>
					{children}
					<ToastContainer
						position="bottom-right"
						autoClose={1000}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
				</AuthProvider>
			</QueryProvider>
		</>
	);
}
