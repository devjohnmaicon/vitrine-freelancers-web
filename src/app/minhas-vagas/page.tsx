import CardComponent from "@/components/CardComponent";
import {JobType} from "@/types/JobType";


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
        <div className="w-1/2 bg-slate-100 min-h-screen  max-w-screen-lg flex flex-col gap-3 m-auto p-4 rounded">
            {
                myJobs.map((job) => {
                    return (
                        <CardComponent key={job.id} data={job} showEditButtons={true}/>
                    )
                })
            }
        </div>
    );
}
