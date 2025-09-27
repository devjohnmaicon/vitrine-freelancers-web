import { Edit, UserPlus } from "lucide-react";
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
  const pathUrlJob = "http://localhost:3000/vagas/minhas-vagas/";
  const urlNewJob = `${pathUrlJob}/new`;

  const jobsOpened = jobList.filter((job) => job.open);
  const jobsClosed = jobList.filter((job) => !job.open);

  if (!jobList || jobList.length === 0) {
    return (
      <div className="max-w-4xl min-h-screen flex flex-col gap-3 m-auto p-2 rounded-md shadow-md shadow-zinc-400/50">
        <h1 className="text-center text-lg font-semibold">
          Nenhuma vaga encontrada
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl min-h-screen flex flex-col m-auto mb-4 space-y-5">
      <div>
        <Button
          asChild
          variant="outline"
          className="text-base underline underline-offset-4 my-1"
        >
          <Link href={urlNewJob}>
            <UserPlus />
            NOVA VAGA
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="jobs-opened" className="w-full">
        <TabsList>
          <TabsTrigger value="jobs-opened">Vagas abertas</TabsTrigger>
          <TabsTrigger value="jobs-closed">Vagas fechadas</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs-opened">
          {jobsOpened.length === 0 && (
            <div className="my-48 text-lg text-center text-gray-500">
              Nenhuma vaga aberta encontrada
            </div>
          )}
          {jobsOpened.map((job: Job, index: number) => {
            return (
              <Card.Root key={index} open={job.open}>
                <Card.Header
                  image="https://github.com/shadcn.png"
                  jobData={job}
                />
                <Card.Content jobData={job}>
                  {job.open && (
                    <Card.Actions>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`${pathUrlJob}/edit/${job.id}`}>
                              <Edit size={22} />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="bg-blue-100 text-blue-950">
                            <p>Editar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <ModalCloseJob jobId={Number(job.id)} sizeIcon={22} />
                    </Card.Actions>
                  )}
                </Card.Content>
              </Card.Root>
            );
          })}
        </TabsContent>
        <TabsContent value="jobs-closed">
          {jobsClosed.map((job: Job, index: number) => {
            return (
              <Card.Root key={index} open={job.open}>
                <Card.Header
                  image="https://github.com/shadcn.png"
                  jobData={job}
                />
                <Card.Content jobData={job}>
                  {job.open && (
                    <Card.Actions>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`${pathUrlJob}/edit/${job.id}`}>
                              <Edit size={22} />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="bg-blue-100 text-blue-950">
                            <p>Editar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <ModalCloseJob jobId={Number(job.id)} sizeIcon={22} />
                    </Card.Actions>
                  )}
                </Card.Content>
              </Card.Root>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
    // </div>
  );
}
