"use client";

import { useMutation } from "react-query";
import { FETCH } from "@/lib/fetch";
import { useAtom } from "jotai";
import { cloudAtom } from "@/lib/store";
import { useEffect } from "react";

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [cloud, setCloud] = useAtom(cloudAtom);

	const myMutation = useMutation({
		mutationFn: FETCH.myself,
		onSuccess: (data) => {
			setCloud({ ...cloud, ...data });
		},
	});

	useEffect(() => {
		if (cloud?.auth_token) {
			myMutation.mutate();
		}
	}, []);

	return <>{children}</>;
}
