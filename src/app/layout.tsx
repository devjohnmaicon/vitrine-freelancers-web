import { FooterComponent } from "@/components/footer-component";
import HeaderComponent from "@/components/header/HeaderComponent";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitrine Freelancers",
  description: "Encontre o Freelancer Ideal para Seu Negócio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50">
        <HeaderComponent />
        <Toaster richColors position="top-right" />
        <main className="flex-1">{children}</main>
        <FooterComponent />
      </body>
    </html>
  );
}
