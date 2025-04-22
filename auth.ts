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
            async authorize(credentials, req) {
                let user: UserAuth | null = null;

                // const parsedCredentials = signInSchema.safeParse(credentials);
                // if (!parsedCredentials) {
                //   console.error(
                //     "Invalid credentials:",
                //     "parsedCredentials.error.errors"
                //   );
                //   return null;
                // }

                let auth_url = "https://reqres.in/api/login";

                const validate_credentials = await fetch(auth_url, {
                    method: "post",
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                    headers: {"Content-Type": "application/json"},
                });

                let response_api = await validate_credentials.json();

                if (validate_credentials.status !== 200) {
                    console.error("Invalid credentials:", response_api);
                    return null;
                }

                user = {
                    id: 1,
                    name: "User",
                    email: credentials.email,
                    image: "https://reqres.in/img/faces/7-image.jpg",
                    token: response_api.token,

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
            if (user) {
                token.id = user.id;
                token.user = user;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({session, token}) {
            session.user = {
                id: 777,
                email: token.user.email,
                image: token.user.image,
            }
            session.accessToken = token.accessToken;
            return session;
        },

    }
};


export const {handlers, signIn, signOut, auth} = NextAuth(nextAuthOptions);
