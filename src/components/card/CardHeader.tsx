import React from 'react';
import {Badge} from "@/components/ui/badge";
import {JobType} from "@/types/JobType";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface CardHeaderProps {
    image?: string;
    jobData: JobType;
}

const CardHeader = ({image,jobData}: CardHeaderProps) => {
    console.log(jobData)

    return (
        <div className='relative flex items-center gap-2 md:gap-4'>
            <Avatar className="h-10  md:h-12 w-10 md:w-12">
                <AvatarImage src={image}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className='py-1 md:py-0'>
                <h2 className="card-title font-bold sm:text-xl md:text-4xl">{jobData.companyName}</h2>
                <p className='text-xs md:text-base text-muted-foreground mt-1'>Publicado: 14, Setembro. 16:40</p>
            </div>

            <Badge className='absolute top-1 right-1 text-[12px] md:text-lg px-1 py-0 sm:py-1 md:px-3'>{jobData.type}</Badge>
        </div>
    );
};

export default CardHeader;