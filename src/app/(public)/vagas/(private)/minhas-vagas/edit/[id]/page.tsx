import FormEdit from "@/app/(public)/vagas/(private)/minhas-vagas/edit/[id]/FormEdit";
import {getJobById} from "@/app/actions/jobs-service";
import JobNotFoundComponent from "@/components/job-not-found";
import {auth} from "../../../../../../../../auth";
import {redirect} from "next/navigation";
import {Session as AuthSession} from "next-auth";
import { Job } from "@/types/Job";

type CustomSession = AuthSession & {
    user: {
        companyId: number;
    };
};

export default async function EditJobPage({params}: { params: { id: string } }) {
    const session = (await auth()) as CustomSession;
    const job: Job = await getJobById(params.id)

    console.log('Job data:', job);

    if (!job) {
        return <JobNotFoundComponent/>
    }

    if (job.companyId !== session?.user?.companyId) {
        redirect('/denied')
    }

    return (
        <FormEdit job={job}/>
    );
}