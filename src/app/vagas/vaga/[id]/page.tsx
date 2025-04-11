"use client";

import {useParams, useRouter} from "next/navigation";
import {JobType} from "@/types/JobType";
import {CalendarDays, CircleArrowLeft, CircleDollarSign, HandCoins, MapPin, Phone, UserRound} from "lucide-react";
import TaxValue from "@/components/TaxValue";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";


export default function JobPage() {
    const {id} = useParams()
    const router = useRouter()
    const job: JobType = fetch(`http://localhost:3333/jobs/${id}`).then((res) => res.json());

    const redirectToJobs = () => {
        router.push(`http://localhost:3000/vagas`);

    };

    return (
        <div className="w-1/2  min-h-screen flex flex-col gap-3 m-auto p-4 rounded">
            <div className='bg-slate-100 p-4 rounded'>
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl py-2 font-semibold">INFORMAÇÕES SOBRE A VAGA</h2>
                </div>
                <hr className="my-3" />
                <div className='flex gap-5 p-4 relative'>
                    <figure className="overflow-hidden flex-shrink-0 w-36 h-40 rounded-lg">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                            alt="Movie"
                            className="object-cover w-full h-full"
                        />
                    </figure>
                    <div className="flex justify-between items-center w-full pl-4">
                        <div>
                            <p>Publicado: 14, Setembro. 16:40</p>
                            <h2 className="card-title text-4xl mt-3">Loja da maria</h2>
                            <p className="text-sm">{job.street}, {job.number}, {job.district}, {job.city}, {job.state}</p>
                        </div>
                        <span
                            className="bg-neutral text-white font-bold p-3 rounded absolute top-2 right-2">FREELANCER</span>
                    </div>
                </div>


                <div className="card-body p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-2"><UserRound/>Vaga para: {job.position}</div>
                        <div className="flex gap-2"><CalendarDays/>Disponivel em: Hoje, {job.startTime} às {job.endTime}</div>
                        <div className="flex gap-2"><CircleDollarSign/>Valor da diária: R$ {job.dailyValue} </div>
                        <div className="flex items-center gap-1 flex-wrap"><HandCoins/>Valor das taxas:
                            <TaxValue value={5}/>| <TaxValue value={10}/> | <TaxValue value={15}/></div>
                        <div className="flex gap-2"><Phone/>Contato: 61 99999-9999</div>
                        <div className="flex gap-2"><MapPin/>Endereço: {job.district},{job.city}, {job.state}</div>
                        <div className="divider col-span-2"></div>
                        <div className="col-span-2">
                            <h2 className='mb-2 text-lg font-bold'>Descrição:</h2>
                            <p className=' '>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has
                                been the standard dummy text ever since the 1500s, when an unknown printer
                                took a
                                galley of type and scrambled it to make a type specimen book. It has survived not only
                                five
                                centuries, but also the leap into electronic typesetting, remaining essentially
                                unchanged.
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                                Ipsum
                                passages, and more recently with desktop publishing software like Aldus PageMaker
                                including
                                versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className='flex justify-between gap-3'>
                        <Button variant='ghost' onClick={redirectToJobs}><CircleArrowLeft size={34}/></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}