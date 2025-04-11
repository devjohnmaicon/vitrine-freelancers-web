'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import FormCompanyRegister from "@/app/register/forms/FormCompanyRegister";
import FormUserRegister from "@/app/register/forms/FormUserRegister";


export default function RegisterComponent() {
    return (
        <div className='w-full h-screen'>
            <Tabs defaultValue="account" className="max-w-2xl m-auto mt-16">
                <TabsList>
                    <TabsTrigger value="account">Empresa</TabsTrigger>
                    <TabsTrigger value="password">Acesso</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <FormCompanyRegister/>
                </TabsContent>
                <TabsContent value="password">
                    <FormUserRegister/>
                </TabsContent>
            </Tabs>
        </div>
    );
}
