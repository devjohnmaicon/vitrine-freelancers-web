import LogoutButton from "@/components/LogoutButton";
import React from "react";


export default function HeaderButtons() {
    return (
        <div>
            <LogoutButton/>
            <a href="/login"
               className="text-sm font-medium transition-colors text-center rounded-md py-2 md:px-3 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                Login
            </a>

            < a href="/register"
                className="text-sm font-medium transition-colors text-center rounded-md py-2 md:px-3 border border-input shadow-sm bg-primary hover:bg-primary/95 text-primary-foreground hover:text-zinc-300    ">
                Registrar - se
            </a>
        </div>
    )
}