'use client';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from '@/components/ui/card'
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Form, FormControl, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'

import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'

import React from "react";
import {DatePickerWithPresets} from "@/components/CalendarComponent";

// Schema for newsletter form validation
const formSchema = z.object({
    email: z.string().email({message: 'Invalid email address'}),
})

export default function RegisterJobPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Simulate a successful newsletter form submission
            console.log(values)
            toast.success(
                'You have been subscribed to our newsletter successfully! (Simulated)',
            )
        } catch (error) {
            console.error('Error submitting newsletter form', error)
            toast.error('Failed to subscribe to our newsletter. Please try again.')
        }
    }

    return (
        <div className="flex min-h-[50vh] h-full w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Cadastro da Vaga
                    </CardTitle>
                    <hr className='py-1' />
                    <CardDescription>
                        Preencha o formulário abaixo para publicar sua vaga de freelancer e encontrar os melhores profissionais para o trabalho.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-2 gap-5">
                                <div className='space-y-1'>
                                    <FormLabel>Vaga</FormLabel>
                                    <Select>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Selecione a vaga"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Tipos</SelectLabel>
                                                <SelectItem value="motoboy">Moto Entegador</SelectItem>
                                                <SelectItem value="sushiman">Sushiman</SelectItem>
                                                <SelectItem value="balconista">Balconista</SelectItem>
                                                <SelectItem value="padeiro">Padeiro</SelectItem>
                                                <SelectItem value="bartender">Bar Tender</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-1'>
                                    <FormLabel>Tipo de vaga</FormLabel>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Tipos</SelectLabel>
                                                <SelectItem value="freelancer">FREELANCER</SelectItem>
                                                <SelectItem value="fixo">FIXO</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='flex flex-col justify-between'>
                                    <FormLabel>Data</FormLabel>
                                    <DatePickerWithPresets/>
                                </div>

                                <div className='flex flex-col justify-between'>
                                    <FormItem className="grid">
                                        <FormLabel htmlFor="taxValue">Valor Diária</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="taxValue"
                                                placeholder="R$ 40,00"
                                                type="number"
                                                step='5'
                                                min='35'
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                </div>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend mb-2">Hora de início</legend>
                                    <input type="time" required className="w-full input input-bordered rounded outline outline-1 outline-zinc-200 p-1 pl-2 cursor-pointer"/>
                                </fieldset>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend mb-2">Hora de término</legend>
                                    <input type="time" required className="w-full input input-bordered rounded outline outline-1 outline-zinc-200 p-1 pl-2 cursor-pointer"/>
                                </fieldset>


                                <div className="grid w-full gap-2 col-span-2 my-2">
                                    <Label htmlFor="message">Descrição da vaga</Label>
                                    <Textarea placeholder="Descreva as atribuições e responsabilidades relacionadas à vaga ofertada." id="message" className='resize-none h-24'/>
                                </div>

                                <Button type="submit" className="w-full col-span-2">
                                    Publicar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
        ;
}