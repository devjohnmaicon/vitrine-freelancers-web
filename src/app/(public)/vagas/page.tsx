import { getOpenJobs } from "@/app/actions/jobs-service";
import { Card } from "@/components/card";
import { Job } from "@/types/Job";
import { ArrowRight, SearchX } from "lucide-react";
import Link from "next/link";

export default async function JobsPage() {
  const jobList: Job[] = await getOpenJobs();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-blue-950 uppercase mb-1">
          Oportunidades
        </p>
        <h1 className="text-2xl font-bold text-slate-900">Vagas disponíveis</h1>
        <p className="text-sm text-slate-500 mt-1">
          Todas as vagas ficam ativas por 12 horas. Candidate-se rápido.
        </p>
      </div>

      {!jobList || jobList.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-slate-400">
          <SearchX size={40} className="opacity-40" />
          <p className="font-medium">Nenhuma vaga disponível no momento</p>
          <p className="text-sm">Volte mais tarde para novas oportunidades.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {jobList.map((job: Job, index: number) => (
            <Card.Root key={index} open={job.open ?? true}>
              <Card.Header image="https://github.com/shadcn.png" jobData={job} />
              <Card.Content jobData={job}>
                <Card.Actions>
                  <Link
                    href={`/vagas/detalhes/${job.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-950 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Ver detalhes <ArrowRight size={13} />
                  </Link>
                </Card.Actions>
              </Card.Content>
            </Card.Root>
          ))}
        </div>
      )}
    </div>
  );
}
