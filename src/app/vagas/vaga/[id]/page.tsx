"use client";

import {useParams, useRouter} from "next/navigation";
import {JobType} from "@/types/JobType";
import {CalendarDays, CircleArrowLeft, CircleDollarSign, HandCoins, Phone, UserRound} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";


export default function JobPage() {
    const {id} = useParams()
    const router = useRouter()
    const job: JobType = fetch(`http://localhost:3333/jobs/${id}`).then((res) => res.json());

    const taxas = [5, , 10, 15]

    const redirectToJobs = () => {
        router.push(`http://localhost:3000/vagas`);

    };

    return (
        <div className='max-w-2xl bg-zinc-100 m-auto p-2 md:p-4 rounded-md shadow shadow-2xl'>
            <div className='flex justify-between items-center'>
                <h2 className="text-xl py-2 font-semibold">INFORMAÇÕES SOBRE A VAGA</h2>
            </div>
            <hr className="my-3"/>
            <div className='flex gap-2 md:gap-4'>
                <div className="h-32 overflow-hidden flex-shrink-0 rounded-lg bg-red-200">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        alt="Movie"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="w-full flex flex-col justify-between items-center md:items-start gap-2">
                    <div className='w-full flex justify-between items-center '>
                        <h2 className="text-xl md:text-4xl font-medium">Loja da maria</h2>
                        <span className="bg-zinc-900 text-zinc-50 text-xs md:text-base font-bold p-1 md:p-2 rounded">FREELANCER</span>
                    </div>
                    <div>
                        <p className='text-xm md:text-md text-muted-foreground'>Publicado: 14, Setembro. 16:40</p>
                        <p className="text-sm md:text-lg font-semibold text-muted-foreground mt-1">Rua Tupinambá, Quadra 10, Condominio
                            - Antares, Valparaíso - GO </p>
                    </div>
                </div>
            </div>

            <div className="mt-3 md:p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-2 text-sm md:text-base"><UserRound size={18}/>{job.position}</div>
                    <div className="flex gap-2 text-sm md:text-base"><CalendarDays/>Hoje, {job.startTime} às {job.endTime}</div>
                    <div className="flex gap-2 text-sm md:text-base"><CircleDollarSign size={18}/>Diária: R$ {job.dailyValue} </div>
                    <div className="flex items-center gap-0.5 md:gap-1 flex-wrap"><HandCoins size={18}/>Taxas:
                        {taxas && taxas.map((tax, index) => (
                            <Badge key={index} variant='secundary' className='text-xs px-1'>{tax}</Badge>))}
                    </div>
                    <div className="flex gap-2 text-sm md:text-base"><Phone size={18}/>(61) 99999-9999</div>
                    {/*<div className="flex gap-2 text-sm md:text-base"><MapPin/>Endereço: {job.district},{job.city}, {job.state}</div>*/}
                    <div className="col-span-2">
                        <h2 className='text-lg font-medium '>Descrição:</h2>
                        <p className='p-1 md:py-3.5 border-y-2'>
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
                <div className='flex justify-between py-3 gap-3'>
                    <a href='/vagas'><CircleArrowLeft size={28}/></a>
                </div>
            </div>
        </div>
    );
}