'use client'
import {Button} from "@/components/ui/button";
import {ExitIcon} from "@radix-ui/react-icons";
import React from "react";
import {signOut} from "next-auth/react";
import {logout} from "@/app/actions/logout";

export default function LogoutButton() {
    const handleLogout = async () => {
        await logout()
        signOut({redirectTo: '/'})
    }
    return (
        <Button variant="outline" onClick={handleLogout} className='mt-4 lg:mt-0'>Sair <ExitIcon/></Button>
    )
}