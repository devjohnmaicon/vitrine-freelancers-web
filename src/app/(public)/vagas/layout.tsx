
export default function Layout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen pt-5 md:pt-7">
            {children}
        </div>
    );
}
