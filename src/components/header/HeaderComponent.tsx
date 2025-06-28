import { Header } from "@/components/header";
import { auth } from "../../../auth";


export default  async function HeaderComponent() {
  const session = await auth()

  return (
    <header className="container m-auto border-b py-4 px-2">
        <nav className="flex items-center justify-between ">
            <Header.Identity />
            <Header.Navigation session={session} />
            <Header.Actions session={session} />
            <Header.Mobile session={session} />
        </nav>
    </header>
  );
};

