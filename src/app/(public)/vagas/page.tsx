import CardComponent from "@/components/card/CardRoot";
import {JobType} from "@/types/JobType";
import {Edit, Ellipsis, Plus} from "lucide-react";
import {Card} from "@/components/card";
import Link from "next/link";
import ModalCloseJob from "@/components/ModalCloseJob";
import React from "react";

export default async function JobsPage() {
    const pathUrlJob = 'http://localhost:3000/vagas/vaga/'
    const jobs: JobType[] = await fetch('http://localhost:3333/jobs/').then((res) => res.json());
    return (
        <div className="max-w-4xl bg-zinc-100 min-h-screen flex flex-col gap-3 m-auto p-2 rounded-md">
            {
                jobs.map((job: JobType, index: number) => (
                    <Card.Root key={index}>
                        <Card.Header image="https://github.com/shadcn.png" jobData={job}/>
                        <Card.Content jobData={job}>
                            <Card.Actions >
                                <Link className='cursor-pointer flex bg-zinc-200 rounded-md py-1.5 px-2 text-sm'
                                      href={`${pathUrlJob}/${job.id}`}><Plus size={18}/> Detalhes</Link>
                            </Card.Actions>
                        </Card.Content>
                    </Card.Root>
                ))
            }
            <span className='flex justify-center cursor-pointer mt-2'><Ellipsis size={30}/></span>
        </div>
    );
}
