"use client";

import {redirect, useParams, useRouter} from "next/navigation";
import {JobType} from "@/types/JobType";
import {
    CalendarDays,
    CircleDollarSign,
    HandCoins,
    MapPin,
    Phone,
    UserRound,
    CircleArrowLeft,
    Pencil, Trash
} from "lucide-react";


export default function EditJobPage() {
    const {id} = useParams()
    const router = useRouter()
    const job: JobType = fetch(`http://localhost:3333/jobs/${id}`).then((res) => res.json());

    const redirectToJobs = () => {
        router.push(`http://localhost:3000/vagas`);
    };

    return (
        <div className="w-1/2  min-h-screen flex flex-col gap-3 m-auto py-5 rounded">
            <div className='bg-slate-100 p-2 rounded'>
                <div className='flex gap-5 p-4 relative'>
                    <figure className="overflow-hidden flex-shrink-0 w-36 h-40 rounded-1">
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
                        <div className="flex gap-2"><HandCoins/>Valor das taxas: 5 | 10 | 15</div>
                        <div className="flex gap-2"><Phone/>Contato: 61 99999-9999</div>
                        <div className="flex gap-2"><MapPin/>Endereço: {job.district},{job.city}, {job.state}</div>
                        <hr className="col-span-2 my-4 border-b-2"/>
                        <div className="col-span-2">
                            Descrição da vaga
                            <p className=' font-bold '>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has
                                been the industry's standard dummy text ever since the 1500s, when an unknown printer
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
                    <hr className="col-span-2 my-4 border-b-2"/>
                    <div className='flex justify-between'>
                        <button className="btn" onClick={redirectToJobs}><CircleArrowLeft size={34}/></button>
                        <div className='flex gap-4'>
                            <button className="btn">Cancelar</button>
                            <button className="btn btn-primary">Salvar</button>
                        </div>
                        <button className=""><Trash color="red"/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}