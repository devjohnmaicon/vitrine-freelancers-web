import {useForm} from "react-hook-form";
import {z} from "zod";

import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {userRegisterSchema} from "@/types/schemas/z";


interface FormUserRegisterProps {
    formUser: ReturnType<typeof useForm<z.infer<typeof userRegisterSchema>>>;
    onSubmit: () => void;
}

export default function FormUserRegister({formUser, onSubmit}: FormUserRegisterProps) {

    return (
        <Form {...formUser}>
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Cadastro do usuário
                    </CardTitle>
                    <hr className='py-1'/>
                    <CardDescription>
                        Preencha o formulário abaixo para criar sua conta de usuário.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formUser.handleSubmit(onSubmit)} className="space-y-4 ">
                        <FormField
                            control={formUser.control}
                            name="username"
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
                            control={formUser.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu e-mail" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formUser.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Digite a senha"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formUser.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirmar Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirme a senha"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full py-5" disabled={!formUser.formState.isValid}>
                            Finalizar Cadastro
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}