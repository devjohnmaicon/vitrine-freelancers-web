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
                                Sobre a Plataforma
                            </h1>
                            <p className="text-muted-foreground">
                                Nossa plataforma conecta freelancers talentosos a empresas e indivíduos que buscam serviços de alta
                                qualidade.
                                Oferecemos um ambiente seguro e eficiente para colaboração e crescimento profissional.
                            </p>
                        </div>
                        <div className="mx-auto w-fit lg:mx-0">
                            <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                                Nossos Valores
                            </h3>
                            <ul className="ml-4 list-disc">
                                <li>Conexão entre talentos e oportunidades.</li>
                                <li>Transparência e confiança em cada vaga publicada.</li>
                                <li>Facilidade de uso para freelancers e clientes.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10">
                        <h3 className="text-2xl font-semibold">Por que escolher nossa plataforma?</h3>
                        <p>
                            Somos dedicados a criar um espaço onde freelancers possam prosperar e clientes possam encontrar os melhores
                            profissionais
                            para seus projetos. Junte-se a nós e faça parte dessa comunidade em crescimento.
                        </p>
                        <p>
                            Se você tiver alguma dúvida ou feedback, não hesite em entrar em contato conosco. Estamos aqui para ajudar!
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}