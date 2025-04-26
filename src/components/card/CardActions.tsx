import React from 'react';
import Link from "next/link";
import {Edit, Plus} from "lucide-react";
import ModalCloseJob from "@/components/ModalCloseJob";
interface CardActionsProps {
    children?: React.ReactNode;
    jobId?: string | number;
    showEditButtons?: boolean;
}

const CardActions = ({children, jobId, showEditButtons}: CardActionsProps) => {
    const pathUrlJob = 'http://localhost:3000/vagas/vaga/'

    return (
        <div className='flex justify-end items-center gap-3 mt-2 pb-2'>
            {children}
            {/*<Link className='cursor-pointer flex bg-zinc-200 rounded-md py-1.5 px-2 text-sm' href={`${pathUrlJob}/${jobId}`}><Plus*/}
            {/*    size={18}/> Detalhes</Link>*/}
            {/*{showEditButtons &&*/}
            {/*    <>*/}
            {/*        <Link href={` ${pathUrlJob}/edit/${jobId}`} className=''><Edit size={18}/></Link>*/}
            {/*        <ModalCloseJob/>*/}
            {/*    </>*/}
            {/*}*/}
        </div>
    );
};

export default CardActions;