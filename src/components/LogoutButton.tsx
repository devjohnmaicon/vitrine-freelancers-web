'use client'
import {Button} from "@/components/ui/button";
import {ExitIcon} from "@radix-ui/react-icons";
import React from "react";
import {signOut} from "next-auth/react";

export default function LogoutButton() {
    const handleLogout = () => {
        signOut({redirectTo: '/'})
    }
    return (
        <Button variant="outline" onClick={handleLogout} className='mt-4 lg:mt-0'>Sair <ExitIcon/></Button>
    )
}