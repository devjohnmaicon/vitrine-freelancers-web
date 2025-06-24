import React from 'react';
import {Job} from "@/types/Job";
import {Card} from "@/components/card";
import {Button} from "@/components/ui/button";
import Link from 'next/link';
import {getOpenJobs} from "@/app/actions/jobs-service";
import {Plus} from 'lucide-react';

export default async function HomeSectionTwoComponent() {
    const firstThreeJobs = 3;
    const listJobs: Job[] = await getOpenJobs(0, firstThreeJobs);
    const pathUrlJob = 'http://localhost:3000/vagas/vaga/'

    return (
        <section className="w-full py-5">
            <div className="max-w-4xl m-auto rounded-md shadow-md shadow-zinc-400/50">
                <h2 className="text-3xl font-semibold underline underline-offset-4 my-4 p-4">Últimas publicações</h2>
                <div className='flex flex-col gap-4 p-4'>
                    {
                        listJobs ? listJobs.map(
                                (job: Job, index: number) => (
                                    <Card.Root key={index} open={true}>
                                        <Card.Header image="https://github.com/shadcn.png" jobData={job}/>
                                        <Card.Content jobData={job}>
                                            <Card.Actions>
                                                <Link className='cursor-pointer flex bg-blue-100 rounded-md p-1.5 text-sm'
                                                      href={`${pathUrlJob}/${job.id}`}><Plus size={18}/> Detalhes</Link>
                                            </Card.Actions>
                                        </Card.Content>
                                    </Card.Root>
                                ))
                            : <h1 className='text-center text-lg font-semibold'>Nenhuma vaga encontrada</h1>
                    }
                    <div className='h-2'/>
                    <Button asChild className='w-1/2 m-auto rounded-full'>
                        <Link href="/vagas">TODAS AS VAGAS</Link>
                    </Button>

                </div>
            </div>
        </section>
    );
}
;

