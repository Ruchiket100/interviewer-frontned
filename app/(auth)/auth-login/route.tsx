import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const store = await cookies();
	const url = new URL(req.url);
	const host = url.host;
	const searchParams = url.searchParams;

	async function setCookie(cookie: { auth_token: string | null }) {
		store.set({
			expires: new Date("SUN, 6 April 9999 23:59:59 GMT"),
			value: encodeURIComponent(JSON.stringify(cookie)),
			name: "interviewer-cookie",
		});
	}

	const auth_token = searchParams.get("token");
	const redirect_url = searchParams.get("redirect");
	setCookie({ auth_token });
	redirect(redirect_url || "/");
}
