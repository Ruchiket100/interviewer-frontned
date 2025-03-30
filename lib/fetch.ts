const request = async (
    {
        url, 
        method = 'GET',
        data
    }: {url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any}
)=> {
    let decodedCloud = "";
    // TODO: set cloud type
    let cloud:any;
    // cookie logic
    if (typeof document !== "undefined") {
        
        decodedCloud = decodeURIComponent(
            document.cookie
                .split(";")
                .find((c) =>
                    c
                        .trim()
                        .startsWith("interviewer-cookie" ),
                )
                ?.replace(
                    "interviewer-cookie" +
                        "=",
                    "",
                ) || "{}",
        );
        cloud = JSON.parse(decodeURIComponent(decodedCloud));

    }
    else{
        // if its working on server
        const { cookies } = require("next/headers");
        const cookieStore = await cookies();
        const cookie = cookieStore.get("interviewer-cookie");
        decodedCloud = decodeURIComponent(cookie.value);
        cloud = JSON.parse(decodedCloud);
    }

    const authToken = cloud?.auth_token;    

    try{
    const response = await fetch("http://localhost:8080/api"+url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'auth_token': authToken
        },
        body: JSON.stringify(data)
    })
    const json = await response.clone().json();
        if (json && response.ok) {
            return json;
        } else {
            throw json;
        }} catch(err){throw err}
}
export const  FETCH = {
    auth: {
        login: async (data: {email: string, password: string}) => {
            return request({
                url: '/auth/login',
                method: 'POST',
                data
            })
        },
        register: async (data: {email: string, password: string}) => {
            return request({
                url: '/auth/register',
                method: 'POST',
                data
            })
        },
        logout: async () => {
            return request({
                url: '/auth/logout',
                method: 'POST',
                data: {}
            })
        },
    },
    myself: async () => {
        return request({url: "/user/myself", method: "GET"})
    },
    user: {
        myself: {
            checkusername: async (username: string) => {
                return request({url: "/user/myself/username/check", method: "POST", data: {username}})
            },
            username: async (username: string) => {
                return request({url: "/user/myself/username", method: "PUT", data: {username}})
            }
        },
        get: async (username: string) => {return request({url: `/user/${username}`, method: "GET"})}
    }
}