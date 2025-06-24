import { ExtendedSession, ExtendedToken, ExtendedUser } from "@/types/session";
import { error } from "console";
import { max } from "date-fns";
import NextAuth, { User } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

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

      async authorize(credentials) {
        const authUrl = "http://localhost:8080/auth/login";

        const email = typeof credentials?.email === "string" ? credentials.email : undefined;
        const password = typeof credentials?.password === "string" ? credentials.password : undefined;

        if (!email || !password) {
          return null;
        }

        try {
          const response = await fetch(authUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          });
          const json = await response.json();

          if (json.status_code !== 200 || json.error != null) {
            return null
          }

          return {
            name: json.data.name ?? "User logged",
            email: json.data.email ?? email,
            companyId: json.data.companyId,
            token: json.data.token,
          };
        } catch (error) {
          console.error("Erro ao autenticar usuário.");
          return null;
        }
      },
      
    }),
  ],

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 dia
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 1 dia
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.companyId = (user as any).companyId;
        token.name = user.name as string;
        token.email = user.email as string;
        token.token = user.token as string;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        name: token.name ?? null,
        email: token.email ?? null,
        companyId: token.companyId ?? null,
      };
      session.accessToken = token.token ?? null;
      return session;
    },
  }
};

export const { handlers, signOut, auth } = NextAuth(nextAuthOptions);
