import HeaderActions from "@/components/header/HeaderActions";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sheet, MenuIcon } from "lucide-react";

export default function HeaderMobile() {
  return (
      <Sheet>
        <h2>Mobile</h2>
        
        {/* <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon">
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger> */}

        {/* <SheetContent className="max-h-screen overflow-auto"> */}
          {/* <SheetHeader>
            <SheetTitle>
              <a className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-tighter">
                  Vitrine Freelancers
                </span>
              </a>
            </SheetTitle>
          </SheetHeader> */}
          {/* <div className="flex flex-col p-4">
            <div className="flex flex-col gap-6">
              <a href="/" className="font-medium">
                Inicio
              </a>
              <a href="/vagas" className="font-medium">
                Vagas
              </a>
              <a href="/vagas/minhas-vagas" className="font-medium">
                Minhas Vagas
              </a>
              <a href="/sobre" className="font-medium">
                Sobre
              </a>
              <a href="/contato" className="font-medium">
                contato
              </a>
            </div>

            <HeaderActions />
          </div> */}
        {/* </SheetContent> */}
      </Sheet>
  );
}
