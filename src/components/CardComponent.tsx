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

    const taxas = [5, , 10, 15]

    return (
        <div
            // className="card max-h-56 bg-zinc-50 w-full card-side bg-base-100 shadow-xl pl-3 py-5 flex justify-center items-center gap-4 cursor-pointer border-1 rounded-xl"
            className='bg-zinc-50  flex rounded-md p-1'
        >

            <figure className="overflow-hidden flex-shrink-0 flex items-center">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="img"
                    className="object-cover rounded w-10 h-12 md:w-36 md:h-40"
                />
            </figure>

            <div className="card-body px-1 md:p-4 flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="card-title font-bold text-md md:text-3xl">{data.companyName}</h2>
                        <p className='text-xs'>Publicado: 14, Setembro. 16:40</p>
                    </div>

                    <Badge className='md:text-md px-1 md:px-3'>{data.type}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-1 p-0.5">
                    <div className="col-span-2 font-bold col-span-2 font-semibold truncate text-sm">{data.description}</div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><UserRound size={18}/>{data.position}</div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-xs md:text-base">
                        <CalendarDays/> Hoje, {data.startTime} às {data.endTime}
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><CircleDollarSign size={18}/> Diária:
                        R$ {data.dailyValue},00
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1 flex-wrap"><HandCoins size={18}/>Taxas:
                        {taxas && taxas.map((tax, index) => (
                            <Badge key={index} variant='secundary' className='text-xs px-1'>{tax}</Badge>))}
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><Phone size={18}/>61 99999-9999</div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><MapPin size={18}/> Valparaíso, Goiás</div>
                </div>
                <div className='flex justify-end items-center gap-3  pb-2'>
                    <Link  className='cursor-pointer flex bg-zinc-200 rounded-md py-1 px-2 text-sm' href={`${pathUrlJob}/${data.id}`}><Plus size={20}/> Detalhes</Link>
                    {showEditButtons &&
                        <>
                            <Link href={` ${pathUrlJob}/edit/${data.id}`} className=''><Edit size={18}/></Link>
                            <ModalCloseJob/>
                        </>
                    }
                </div>
            </div>
        </div>
    )
        ;
}
