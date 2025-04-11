import {CalendarDays, CircleDollarSign, Edit, HandCoins, MapPin, Phone, Plus, UserRound} from "lucide-react";
import {JobType} from "@/types/JobType";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import ModalCloseJob from "@/components/ModalCloseJob";

interface CardComponentProps {
    data: JobType;
    showEditButtons: boolean;
}

export default function CardComponent({data, showEditButtons}: CardComponentProps) {

    const pathUrlJob = 'http://localhost:3000/vagas/vaga/'


    return (
        <div
            className="card max-h-56 bg-zinc-50 w-full card-side bg-base-100 shadow-xl pl-3 py-5 flex justify-center items-center gap-4 cursor-pointer border-1 rounded-xl">
            <figure className="overflow-hidden flex-shrink-0 w-36 h-40 rounded">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="IMG"
                    className="object-cover w-full h-full"
                />
            </figure>

            <div className="card-body p-4 flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="card-title text-3xl">{data.companyName}</h2>
                        <p>Publicado: 14, Setembro. 16:40</p>
                    </div>

                    <Badge className='text-md px-3'>{data.type}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <div className="col-span-2 font-bold col-span-2 font-bold truncate ">{data.description}</div>
                    <div className="flex gap-1"><UserRound/>{data.position}</div>
                    <div className="flex gap-1"><CalendarDays/> Hoje, {data.startTime} às {data.endTime}</div>
                    <div className="flex gap-1"><CircleDollarSign/> Diária: R$ {data.dailyValue} </div>
                    <div className="flex gap-1"><HandCoins/>Taxas: 5 | 10 | 15</div>
                    <div className="flex gap-1"><Phone/>61 99999-9999</div>
                    <div className="flex gap-1"><MapPin/> Valparaíso, Goiás</div>
                </div>
                <div className='flex justify-end items-center gap-3  pb-2'>
                    <Link className='cursor-pointer flex  bg-zinc-200 rounded-md py-1 px-2' href={`${pathUrlJob}/${data.id}`}><Plus
                        size={20}/> Detalhes</Link>
                    {showEditButtons &&
                        <>
                            <Link href={` ${pathUrlJob}/edit/${data.id}`} className=''><Edit/></Link>
                            <ModalCloseJob/>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}
