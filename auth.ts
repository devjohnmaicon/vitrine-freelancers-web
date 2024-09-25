import { signInSchema } from "@/app/lib/zod";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";

const nextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Digite o seu e-mail",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Digite a sua senha",
        },
      },
      async authorize(credentials, req) {
        let response = null;

        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials) {
          console.error(
            "Invalid credentials:",
            "parsedCredentials.error.errors"
          );
          return null;
        }

        let url = "https://reqres.in/api/login";

        response = await fetch(url, {
          method: "post",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 400) {
          console.log("-----------> Invalid credentials");
          return null;
        } else {
          // console.log("----------->", response);
            
          response = {
            id: "1",
            name: "Aditya Singh",
            email: "jojo@jojo.com",
            role: "admin",
          };
        }

        return response;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthOptions);
