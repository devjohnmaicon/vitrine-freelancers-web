import {JobType} from "@/types/JobType";
import {Edit, UserPlus} from "lucide-react";
import Link from "next/link";
import {Card} from "@/components/card";
import ModalCloseJob from "@/components/ModalCloseJob";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Button} from "@/components/ui/button";

export default async function MyJobsPage() {
    const myJobs: JobType[] = await fetch('http://localhost:3333/my-jobs', {
        method: 'GET',
        cache: 'no-store'
    }).then((res) => res.json());

    const pathUrlJob = 'http://localhost:3000/vagas/minhas-vagas/'

    const urlNewJob = `${pathUrlJob}/new`
    return (
        <div className="max-w-4xl min-h-screen flex flex-col m-auto my-2">
            <div>
                <Button asChild variant='outline' className='text-base underline underline-offset-4'>
                    <Link href={urlNewJob}>
                        <UserPlus/>NOVA VAGA
                    </Link>
                </Button>
            </div>


            <div className='flex flex-col gap-3 mt-4 p-2 rounded-lg'>
                {
                    myJobs.map((job: JobType, index: number) => {
                        return (
                            <Card.Root key={index}>
                                <Card.Header image="https://github.com/shadcn.png" jobData={job}/>
                                <Card.Content jobData={job}>
                                    <Card.Actions>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`${pathUrlJob}/edit/${job.id}`}><Edit size={18}/></Link>
                                                </TooltipTrigger>
                                                <TooltipContent className='bg-blue-100 text-blue-950'>
                                                    <p>Editar</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <ModalCloseJob/>
                                    </Card.Actions>
                                </Card.Content>
                            </Card.Root>
                        )
                    })
                }
            </div>

        </div>
    );
}
