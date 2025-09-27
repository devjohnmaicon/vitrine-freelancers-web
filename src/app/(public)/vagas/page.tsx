import { getOpenJobs } from "@/app/actions/jobs-service";
import { Card } from "@/components/card";
import { Job } from "@/types/Job";
import { Ellipsis, Plus } from "lucide-react";
import Link from "next/link";

export default async function JobsPage() {
  const pathUrlJob = "http://localhost:3000/vagas/detalhes/";
  const jobList: Job[] = await getOpenJobs();

  if (!jobList) {
    return (
      <div className="max-w-4xl min-h-screen flex flex-col gap-3 m-auto p-2 rounded-md shadow-md shadow-zinc-400/50">
        <h1 className="text-center text-lg font-semibold">
          Nenhuma vaga encontrada
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl min-h-screen flex flex-col gap-3 m-auto p-2 rounded-md shadow-md shadow-zinc-400/50">
      {jobList.map((job: Job, index: number) => (
        <Card.Root key={index} open={true}>
          <Card.Header image="https://github.com/shadcn.png" jobData={job} />
          <Card.Content jobData={job}>
            <Card.Actions>
              <Link
                className="cursor-pointer flex bg-zinc-200 rounded-md py-1.5 px-2 text-sm"
                href={`${pathUrlJob}/${job.id}`}
              >
                <Plus size={18} /> Detalhes
              </Link>
            </Card.Actions>
          </Card.Content>
        </Card.Root>
      ))}
      <span className="flex justify-center cursor-pointer mt-2">
        <Ellipsis size={30} />
      </span>
    </div>
  );
}
