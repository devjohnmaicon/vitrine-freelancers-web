import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import {DefaultUser} from "@auth/core/types";

export type UserAuth = {
    token: string;
} & DefaultUser

const nextAuthOptions = {
    providers: [
        credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "Digite o seu e-mail"},
                password: {label: "Password", type: "password", placeholder: "Digite a sua senha"},
            },
            async authorize(credentials) {
                let user: UserAuth | null = null;
                const auth_url = "https://reqres.in/api/login";

                const validate_credentials = await fetch(auth_url, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                    headers: {"Content-Type": "application/json", "x-api-key": "reqres-free-v1"},
                });

                const response_api = await validate_credentials.json();

                if (response_api.error) {
                    console.error("authorize - Error:", response_api);
                    return null;
                }

                user = {
                    id: 1,
                    name: "User config",
                    email: credentials.email,
                    image: "https://reqres.in/img/faces/7-image.jpg"
                };

                return user;

            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({token, user}) {
            return token;
        },
        async session({session}) {
            return {
                user: {
                    ...session.user,
                    role: 'COMPANY'
                },
            }
        },

    }
};


export const {handlers, auth} = NextAuth(nextAuthOptions);
