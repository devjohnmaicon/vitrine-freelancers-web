'use client';

import { signOut } from "next-auth/react";

export default function BtnLogout() {
    return (
        <button className="btn" onClick={() => signOut({redirectTo:'/'})}>Logout</button>
    )

}