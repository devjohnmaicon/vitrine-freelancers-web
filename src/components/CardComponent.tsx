import {CalendarDays, CircleDollarSign, HandCoins, MapPin, Phone, UserRound} from "lucide-react";
import {JobType} from "@/types/JobType";
import BtnShowMoreComponent from "@/components/BtnShowMore";
import BtncloseJobComponent from "@/components/BtnCloseJob";
import BtnEditComponent from "@/components/BtnEdit";


export default function CardComponent({key, data, showEditButtons}: { key: number, data: JobType, showEditButtons: boolean }) {
    return (
        <div
            className="card max-h-56 w-full card-side bg-base-100 shadow-xl pl-3 flex justify-center items-center gap-4 cursor-pointer">
            <figure className="bg-red-300 overflow-hidden flex-shrink-0 w-36 h-40 rounded">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="Movie"
                    className="object-cover w-full h-full"
                />
            </figure>

            <div className="card-body p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="card-title text-3xl">{data.companyName}</h2>
                        <p>Publicado: 14, Setembro. 16:40</p>
                    </div>

                    <span className="bg-neutral text-white font-bold p-2 rounded">{data.type}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <div className="col-span-2 font-bold col-span-2 font-bold truncate">
                        {data.description}
                    </div>
                    <div className="flex gap-1"><UserRound/>{data.position}</div>
                    <div className="flex gap-1"><CalendarDays/> Hoje, {data.startTime} às {data.endTime}</div>
                    <div className="flex gap-1"><CircleDollarSign/> Diária: R$ {data.dailyValue} </div>
                    <div className="flex gap-1"><HandCoins/>Taxas: 5 | 10 | 15</div>
                    <div className="flex gap-1"><Phone/>61 99999-9999</div>
                    <div className="flex gap-1"><MapPin/> Valparaíso, Goiás</div>
                </div>
                <div className='flex justify-end items-center gap-2 pb-2'>
                    <BtnShowMoreComponent id={data.id}/>
                    {showEditButtons &&
                        <>
                            <BtnEditComponent id={data.id}/>
                            <BtncloseJobComponent id={data.id}/>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}
