import {JobType} from "@/types/JobType";
import Link from "next/link";
import {Card} from "@/components/card";
import {Plus} from "lucide-react";
import React from "react";

export default async function Home() {
    const listJobs: JobType[] = await fetch('http://localhost:3333/jobs/').then((res) => res.json());
    const pathUrlJob = 'http://localhost:3000/vagas/vaga/'

    return (
        <div>
            <section
                className="min-h-screen w-full bg-base-200 bg-cover bg-center  flex items-center justify-center lg:justify-start 2xl:pl-60"
                style={{
                    backgroundImage:
                        "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}
            >
                <div className=" text-zinc-100 bg-zinc-900/70 p-4 md:px-7 md:py-9 lg:px-10 md:rounded-xl  md:mx-2 lg:mx-4 ">
                    <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">Encontre o Freelancer Ideal para Seu Negócio</h1>
                    <p className="max-w-xl text-xl lg:text-2xl mb-8">
                        Aqui você encontra freelancers prontos para atender rápido, perto de você e com qualidade garantida.
                    </p>
                    <div className='flex justify-start gap-2 md:gap-4 mt-5'>
                        <a href="/vagas" className="text-xl py-2 sm:py-4 px-4 sm:px-6 bg-zinc-900 rounded-lg">Ver vagas</a>
                        <a href="/register"
                           className="text-xl text-zinc-900 py-2 sm:py-4 px-4 sm:px-6 bg-zinc-200 rounded-lg">Registrar-se</a>
                    </div>
                </div>
            </section>

            <section className="w-full py-5">
                <div className="max-w-4xl bg-zinc-100 m-auto rounded-md shadow-md shadow-zinc-400/50">
                    <h2 className="text-3xl font-semibold underline underline-offset-4 my-4 p-4">Últimas publicações</h2>
                    <div className='flex flex-col gap-4 p-4'>
                        {
                            listJobs.slice(0, 3).map(
                                (job: JobType, index: number) => (
                                    <Card.Root key={index}>
                                        <Card.Header image="https://github.com/shadcn.png" jobData={job}/>
                                        <Card.Content jobData={job}>
                                            <Card.Actions>
                                                <Link className='cursor-pointer flex bg-zinc-200 rounded-md p-1.5 text-sm'
                                                      href={`${pathUrlJob}/${job.id}`}><Plus size={18}/> Detalhes</Link>
                                            </Card.Actions>
                                        </Card.Content>
                                    </Card.Root>
                                ))
                        }
                        <div className='h-2'/>
                        <Link href="/vagas" className="w-1/2 m-auto bg-zinc-900 text-white text-center p-2 rounded-full">
                            TODAS AS VAGAS
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
