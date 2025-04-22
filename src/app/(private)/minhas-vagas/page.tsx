import CardComponent from "@/components/CardComponent";
import {JobType} from "@/types/JobType";
import {UserPlus} from "lucide-react";
import Link from "next/link";
import {redirect} from "next/navigation";
import {auth} from "../../../../auth";


export default async function MyJobsPage() {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    const myJobs: JobType[] = await fetch('http://localhost:3333/my-jobs', {
        method: 'GET',
        cache: 'no-store'
    }).then((res) => res.json());

    return (
        <div className="lg:w-1/2 min-h-screen max-w-screen-lg flex flex-col m-auto lg:p-2  my-2">
            <div>
                <Link href='/src/app/(public)/vagas/vaga/new'
                      className='flex items-center gap-2 lg:text-xl ml-2 underline underline-offset-4 pl-1'><UserPlus/>Cadastrar vaga</Link>
            </div>
            <div className='bg-slate-100 flex flex-col gap-3 mt-4 p-2 lg:p-3 rounded-lg'>
                {
                    myJobs.map((job) => {
                        return (
                            <CardComponent key={job.id} data={job} showEditButtons={true}/>
                        )
                    })
                }
            </div>

        </div>
    );
}
