import type {Metadata} from "next";
import "./globals.css";
import {FooterComponent} from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
import {AuthProvider} from "@/providers/auth-provider";

export const metadata: Metadata = {
    title: "Vitrine Freelancers",
    description: "Encontre o Freelancer Ideal para Seu Negócio",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
        </head>
        <body>
        <div className="h-screen ">
            <HeaderComponent/>
            {children}
            <FooterComponent/>
        </div>
        </body>
        </html>
    );
}
