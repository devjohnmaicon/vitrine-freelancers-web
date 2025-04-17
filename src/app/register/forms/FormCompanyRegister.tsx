import {useForm} from "react-hook-form";
import {z} from "zod";

import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronsRight} from "lucide-react";
import {companyRegisterSchema} from "@/types/schemas/z";


interface FormCompanyRegisterProps {
    formCompany: ReturnType<typeof useForm<z.infer<typeof companyRegisterSchema>>>;
    changeTab: () => void;
}

export default function FormCompanyRegister({formCompany, changeTab}: FormCompanyRegisterProps) {
    const nextTab = () => {
        changeTab()
    };

    return (
        <Form {...formCompany}>
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Cadastro da Loja/Empresa
                    </CardTitle>
                    <hr className='py-1'/>
                    <CardDescription>
                        Preencha o formulário abaixo para publicar sua vaga de freelancer e encontrar os melhores profissionais para o
                        trabalho.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formCompany.handleSubmit(nextTab)} className="space-y-4">
                        <FormField
                            control={formCompany.control}
                            name="nome"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formCompany.control}
                            name="tel"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o telefone" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formCompany.control}
                            name="cnpj"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>CNPJ</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o CNPJ" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formCompany.control}
                            name="state"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>CEP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o cep" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className='grid grid-cols-2 gap-2'>
                            <FormField
                                control={formCompany.control}
                                name="city"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Cidade</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite a cidade" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formCompany.control}
                                name="state"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o estado" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <FormField
                                control={formCompany.control}
                                name="street"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Rua</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formCompany.control}
                                name="number"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Número</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o número" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full mt-2" disabled={!formCompany.formState.isValid}>
                            Continuar <ChevronsRight/>
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </Form>
    );
}