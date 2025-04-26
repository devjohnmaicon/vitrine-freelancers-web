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
            // className="card max-h-56 bg-zinc-50 w-full card-side pl-3 py-5 flex justify-center items-center gap-4 cursor-pointer border-1 rounded-xl"
            className='w-full h-full bg-zinc-50 bg-base-100 shadow-xl space-y-1 cursor-pointer border-1 rounded-md p-2 md:px-4'
        >
            <div className='relative flex gap-2 md:gap-4'>
                <div className='h-14 md:h-20 w-14 md:w-20 '>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        alt="img"
                        className="object-cover rounded w-full h-full max-w-full max-h-full"
                    />
                </div>

                <div className='py-1 md:py-0'>
                    <h2 className="card-title font-bold text-pretty md:text-4xl">{data.companyName}</h2>
                    <p className='text-xs md:text-base text-muted-foreground mt-1'>Publicado: 14, Setembro. 16:40</p>
                </div>

                <Badge className='absolute top-1 right-1 text-xs md:text-lg px-1 md:px-3 '>{data.type}</Badge>
            </div>

            <div className=''>
                <div className="grid grid-cols-2 gap-1 md:gap-2">
                    <div className="col-span-2 font-bold text-muted-foreground truncate ">{data.description}</div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><UserRound size={18}/>{data.position}</div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-xs md:text-base">
                        <CalendarDays/> Hoje, {data.startTime} às {data.endTime}
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><CircleDollarSign size={18}/> Diária:
                        R$ {data.dailyValue},00
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1 flex-wrap"><HandCoins size={18}/>Taxas:
                        {taxas && taxas.map((tax, index) => (
                            <Badge key={index} variant={'secondary'} className='text-xs px-1'>{tax}</Badge>))}
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><Phone size={18}/>(61) 99999-9999</div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><MapPin size={18}/> Valparaíso, Goiás</div>
                </div>

                <div className='flex justify-end items-center gap-3 mt-2 pb-2'>
                    <Link className='cursor-pointer flex bg-zinc-200 rounded-md py-1.5 px-2 text-sm' href={`${pathUrlJob}/${data.id}`}><Plus
                        size={18}/> Detalhes</Link>
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
