import {Job} from "@/types/Job";
import Link from "next/link";
import {Card} from "@/components/card";
import {ChevronRightCircle, Plus} from "lucide-react";
import React from "react";
import {Button} from "@/components/ui/button";
import {getOpenJobs} from "@/app/actions/jobs-service";
import HomeSectionTwo from "@/components/home-section-two";

export default async function Home() {

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
                        {/*<a href="" className=" bg-zinc-900 rounded-lg">Ver vagas</a>*/}

                        <Button asChild variant='outline' className='text-xl text-zinc-900 py-2 sm:py-6 px-4 sm:px-6'>
                            <Link href="/vagas" className='underline underline-offset-2'>Ver Vagas <ChevronRightCircle/></Link>
                        </Button>
                        <Button asChild className='text-xl  py-2 sm:py-6 px-4 sm:px-6'>
                            <Link href="/register">Registrar-se</Link>
                        </Button>
                    </div>
                </div>
            </section>

                <HomeSectionTwo/>

        </div>
);
}
