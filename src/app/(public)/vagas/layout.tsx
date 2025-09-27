import { BreadcrumbComponent } from "@/components/breadcump-component";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen pt-5 md:pt-7">
      <div className="ml-40 mb-5">
        <BreadcrumbComponent />
      </div>
      {children}
    </div>
  );
}
