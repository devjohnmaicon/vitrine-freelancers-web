import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export default async function AboutPage() {
    return (
        <section className="h-screen py-32 px-1">
            <div className="container m-auto">
                <div className="lg:mx-20 mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
                    <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
                        <div className="text-center lg:text-left">
                            <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                                Fale Conosco
                            </h1>
                            <p className="text-muted-foreground">
                                Estamos disponíveis para perguntas, feedback ou oportunidades de colaboração. Deixe-nos saber como podemos
                                ajudar!
                            </p>
                        </div>
                        <div className="mx-auto w-fit lg:mx-0">
                            <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                                Informações de Contato
                            </h3>
                            <ul className="ml-4 list-disc">
                                <li>
                                    <span className="font-bold">Phone: </span>
                                    (123) 34567890
                                </li>
                                <li>
                                    <span className="font-bold">Email: </span>
                                    <a href="" className="underline">
                                        your-email@example.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10">
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="firstname">Nome</Label>
                                <Input type="text" id="firstname"/>
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="lastname">Sobrenome/Empresa</Label>
                                <Input type="text" id="lastname" placeholder="Ex: Vitrine Freelas"/>
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Email"/>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="subject">Assunto</Label>
                            <Input type="text" id="subject" placeholder="Subject"/>
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="message">Mensagem</Label>
                            <Textarea placeholder="Escreva sua mensagem ou feedback aqui." id="message"/>
                        </div>
                        <Button className="w-full">Enviar Mensagem</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}