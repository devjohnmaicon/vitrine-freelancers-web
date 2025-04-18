import CardComponent from "@/components/CardComponent";
import {JobType} from "@/types/JobType";
import {Ellipsis} from "lucide-react";

export default async function JobsPage() {
    const jobs: JobType[] = await fetch('http://localhost:3333/jobs/').then((res) => res.json());
    return (
        <div className="lg:w-1/2 bg-zinc-100 min-h-screen flex flex-col gap-3 m-auto p-4 rounded-md">
            {
                jobs.map((jobData: JobType, index: number) => (
                    <CardComponent key={index} data={jobData} showEditButtons={false}/>
                ))
            }
            <span className='flex justify-center cursor-pointer mt-2'><Ellipsis size={30}/></span>
        </div>
    );
}
