import React from "react";
import {auth} from "../../../auth";
import LogoutButton from "@/components/LogoutButton";

export default async function HeaderActions() {
    const session = await auth()
    const userLogged = !!session;
    return (
        <>
            {userLogged && <LogoutButton/>}
            {
                !userLogged &&
                <div className='flex flex-col lg:flex-row mt-4 lg:mt-0 gap-2'>
                    <a href="/login"
                       className={`text-sm font-medium transition-colors text-center rounded-md py-2 md:px-3 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground`}>
                        Login
                    </a>
                    <a href="/register"
                       className={`text-sm font-medium transition-colors text-center rounded-md py-2 md:px-3 border border-input shadow-sm bg-primary hover:bg-primary/95 text-primary-foreground hover:text-zinc-300`}>
                        Registrar-se
                    </a>
                </div>
            }
        </>
    )
}