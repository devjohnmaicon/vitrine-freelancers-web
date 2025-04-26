import HeaderActions from "@/components/Header/HeaderActions";
import HeaderNavigation from "@/components/Header/HeaderNav";
import HeaderIdentity from "@/components/Header/HeaderIdentity";
import {HeaderMobile} from "@/components/Header/HeaderMobile";


export default async function HeaderComponent() {

    return (
        <header className="border-b py-4 px-2">
            <div className="container m-auto">
                <nav className="flex items-center justify-between ">
                    <HeaderIdentity/>
                    <HeaderNavigation/>

                    <div className="hidden items-center gap-4 lg:flex">
                        <HeaderActions/>
                    </div>

                    <HeaderMobile/>
                </nav>
            </div>
        </header>
    )
        ;
};



