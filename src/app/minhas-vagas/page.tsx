import CardComponent from "@/components/CardComponent";
import {JobType} from "@/types/JobType";
import {UserPlus} from "lucide-react";
import NewJobComponent from "@/components/NewJobComponent";


export default async function MyJobsPage() {
    // const session = await auth();
    // if (!session) {
    //     redirect("/login");
    // }

    const myJobs: JobType[] = await fetch('http://localhost:3333/my-jobs', {
        method: 'GET',
        cache: 'no-store'
    }).then((res) => res.json());
    console.log(myJobs)


    return (
        <div className="w-1/2 border min-h-screen max-w-screen-lg flex flex-col m-auto p-2 rounded-lg my-2">
            <div>
                {/*<button className="btn btn-primary"><UserPlus />  Cadastrar </button>*/}
                <NewJobComponent/>
            </div>
            <div className='flex flex-col gap-3 mt-1'>
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
