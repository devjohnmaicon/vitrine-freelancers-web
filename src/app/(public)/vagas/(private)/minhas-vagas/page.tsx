import { Edit, Plus, Users } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/card";
import ModalCloseJob from "@/components/modal-close-job";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { getMyjobs } from "@/app/actions/jobs-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Job } from "@/types/Job";

export default async function MyJobsPage() {
  const jobList: Job[] = await getMyjobs();
  const jobsOpened = jobList.filter((job) => job.open);
  const jobsClosed = jobList.filter((job) => !job.open);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest text-blue-950 uppercase mb-1">
            Gestão
          </p>
          <h1 className="text-2xl font-bold text-slate-900">Minhas Vagas</h1>
        </div>
        <Button asChild size="sm" className="bg-blue-950 hover:bg-blue-900 text-white gap-1">
          <Link href="/vagas/minhas-vagas/new">
            <Plus size={15} /> Nova Vaga
          </Link>
        </Button>
      </div>

      {!jobList || jobList.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-slate-400">
          <p className="font-medium text-slate-500">Nenhuma vaga cadastrada</p>
          <p className="text-sm">Crie sua primeira vaga agora.</p>
        </div>
      ) : (
        <Tabs defaultValue="jobs-opened">
          <TabsList className="mb-5 bg-slate-100">
            <TabsTrigger value="jobs-opened">
              Abertas{" "}
              {jobsOpened.length > 0 && (
                <span className="ml-1.5 bg-blue-950 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {jobsOpened.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="jobs-closed">
              Fechadas{" "}
              {jobsClosed.length > 0 && (
                <span className="ml-1.5 bg-slate-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {jobsClosed.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs-opened">
            {jobsOpened.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-12">
                Nenhuma vaga aberta no momento.
              </p>
            ) : (
              <div className="space-y-3">
                {jobsOpened.map((job: Job, index: number) => (
                  <Card.Root key={index} open={job.open}>
                    <Card.Header image="https://github.com/shadcn.png" jobData={job} />
                    <Card.Content jobData={job}>
                      <Card.Actions>
                        {job.applicationsCount !== undefined && job.applicationsCount > 0 && (
                          <Link
                            href={`/vagas/minhas-vagas/${job.id}/candidatos`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-950 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            <Users size={13} />
                            {job.applicationsCount} candidato{job.applicationsCount !== 1 ? "s" : ""}
                            {job.hasNewApplications && (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            )}
                          </Link>
                        )}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/vagas/minhas-vagas/edit/${job.id}`}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                              >
                                <Edit size={16} />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>Editar vaga</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <ModalCloseJob jobId={Number(job.id)} sizeIcon={16} />
                      </Card.Actions>
                    </Card.Content>
                  </Card.Root>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="jobs-closed">
            {jobsClosed.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-12">
                Nenhuma vaga fechada.
              </p>
            ) : (
              <div className="space-y-3">
                {jobsClosed.map((job: Job, index: number) => (
                  <Card.Root key={index} open={false}>
                    <Card.Header image="https://github.com/shadcn.png" jobData={job} />
                    <Card.Content jobData={job}>
                      <></>
                    </Card.Content>
                  </Card.Root>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
