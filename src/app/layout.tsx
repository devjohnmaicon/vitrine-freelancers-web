import type {Metadata} from "next";
import "./globals.css";
import {FooterComponent} from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
