import { Header } from "@/components/header";


export default  function HeaderComponent() {
  return (
    <header className="container m-auto border-b py-4 px-2">
        <nav className="flex items-center justify-between ">
            <Header.Identity />
            <Header.Navigation />
            <Header.Actions />
            {/* <Header.Mobile /> */}
        </nav>
    </header>
  );
};

