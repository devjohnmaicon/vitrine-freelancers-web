'use client'
import {Button} from "@/components/ui/button";
import {ExitIcon} from "@radix-ui/react-icons";
import React from "react";
import {signOut} from "next-auth/react";

export default function LogoutButton() {
    return (
        <Button variant="outline" onClick={() => signOut()}>Sair <ExitIcon/></Button>
    )
}