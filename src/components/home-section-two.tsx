import { Job } from "@/types/Job";
import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getOpenJobs } from "@/app/actions/jobs-service";
import { ArrowRight } from "lucide-react";

export default async function HomeSectionTwo() {
  const listJobs: Job[] = await getOpenJobs(0, 3);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-950 uppercase mb-1">
              Oportunidades
            </p>
            <h2 className="text-2xl font-bold text-slate-900">Últimas vagas</h2>
          </div>
          <Link
            href="/vagas"
            className="text-sm font-medium text-blue-950 hover:underline flex items-center gap-1"
          >
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>

        {listJobs && listJobs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {listJobs.map((job: Job, index: number) => (
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
        ) : (
          <p className="text-center text-slate-500 py-10">
            Nenhuma vaga disponível no momento.
          </p>
        )}

        <div className="mt-8 text-center">
          <Button asChild className="bg-blue-950 hover:bg-blue-900 px-8">
            <Link href="/vagas">Todas as vagas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
