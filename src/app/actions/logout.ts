'use server'
import { sign } from "crypto";
import { signOut } from "next-auth/react";
import {cookies} from "next/headers";

export async function logout() {
    cookies().delete('jwt')
}