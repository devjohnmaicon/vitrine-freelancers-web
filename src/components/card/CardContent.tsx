import React from 'react';
import {CalendarDays, CircleDollarSign, HandCoins, MapPin, Phone, UserRound} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {JobType} from "@/types/JobType";

interface CardContetProps {
    children: React.ReactNode;
    jobData: JobType;
}

const CardContent = ({children, jobData}: CardContetProps) => {
    const taxas = [5, , 10, 15]
    const isDeliveryMan = jobData.position === 'delivery-man'

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-1">
                <div
                    className="col-span-2 md:col-span-3 font-bold text-sm md:text-base text-muted-foreground truncate_two_lines bg-zinc-100 rounded mb-1">{jobData.description}</div>
                <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><UserRound size={18}/>{jobData.position}</div>
                <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base">
                    <CalendarDays size={18}/> Hoje, {jobData.startTime} às {jobData.endTime}
                </div>
                <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><CircleDollarSign size={18}/> Diária:
                    R$ {jobData.dailyValue},00
                </div>
                {isDeliveryMan &&
                    < div className="flex items-center gap-0.5 md:gap-1 flex-wrap"><HandCoins size={18}/>Taxas:
                        {taxas && taxas.map((tax, index) => (
                            <Badge key={index} variant={'secondary'} className='text-xs px-1'>{tax}</Badge>
                        ))}
                    </div>
                }

                <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><Phone size={18}/>(61) 99999-9999</div>
                <div className="flex items-center gap-0.5 md:gap-1 text-sm md:text-base"><MapPin size={18}/> Valparaíso, Goiás</div>
            </div>
            {
                children
            }
        </>
    )
};

export default CardContent;