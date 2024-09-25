import { AuthError } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export async function handleCredentialsSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    signIn("credentials", { email, password, redirectTo: "/minhas-vagas" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}

export async function handleGithubSignin() {
  await signIn("github", { redirectTo: "/" });
}

export async function handleSignOut() {
  await signOut();
}
