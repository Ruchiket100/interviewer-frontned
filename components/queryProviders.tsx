"use client";

import { QueryClient, QueryClientProvider } from "react-query";

export default function QueryProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);
}
