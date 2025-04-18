'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import FormCompanyRegister from "@/app/register/forms/FormCompanyRegister";
import FormUserRegister from "@/app/register/forms/FormUserRegister";
import React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {companyRegisterSchema, userRegisterSchema} from "@/types/schemas/z";


export default function RegisterComponent() {
    const [selectedTable, setSelectedTable] = React.useState('company');

    const formCompany = useForm<z.infer<typeof companyRegisterSchema>>({
        resolver: zodResolver(companyRegisterSchema),
        defaultValues: {
            nome: "",
            tel: "",
            cnpj: "",
            state: "",
            street: "",
            number: "",
            city: "",
        },
    });

    const formUser = useForm<z.infer<typeof userRegisterSchema>>({
        resolver: zodResolver(userRegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });


    const handleTabChange = () => {
        setSelectedTable('password');
    }

    const handleOnSubmit = () => {
        console.log('payload: ', {...formCompany.getValues(), ...formUser.getValues()})
    };

    return (
        <div className='w-full min-h-screen'>
            <Tabs value={selectedTable} onValueChange={setSelectedTable} className="max-w-2xl m-auto mt-16">
                <TabsList >
                    <TabsTrigger value="company">Dados da Empresa</TabsTrigger>
                    <TabsTrigger value="password" disabled={!formCompany.formState.isValid}>Dados para acesso</TabsTrigger>
                </TabsList>
                <TabsContent value="company">
                    <FormCompanyRegister formCompany={formCompany} changeTab={handleTabChange}/>
                </TabsContent>
                <TabsContent value="password">
                    <FormUserRegister formUser={formUser} onSubmit={handleOnSubmit}/>
                </TabsContent>
            </Tabs>
        </div>
    );
}
