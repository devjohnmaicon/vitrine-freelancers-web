import { Job } from "@/types/Job";
import {
  CalendarDays,
  CircleArrowLeft,
  CircleDollarSign,
  HandCoins,
  Phone,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getJobById } from "@/app/actions/jobs-service";
import React from "react";
import { Label } from "@/components/ui/label";
import { ptBR } from "date-fns/locale/pt-BR";
import { formatDate } from "date-fns";
import { getJobTypeDisplayName } from "@/lib/utils";

export default async function JobPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const job: Job = await getJobById(id);

  const taxas = [5, , 10, 15];

  // const redirectToJobs = () => {
  //     router.push(`http://localhost:3000/vagas`);
  // };

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-zinc-50 m-auto p-2 md:p-4 rounded-md border border-b-3 border-zinc-300">
      <div className="flex justify-between items-center">
        <h2 className="text-xl py-2 font-semibold">INFORMAÇÕES SOBRE A VAGA</h2>
      </div>
      <hr className="border-2 my-2" />
      <div className="flex gap-2 md:gap-4 py-2">
        <div className="h-32 overflow-hidden flex-shrink-0 rounded-lg bg-red-200">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Movie"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full flex flex-col justify-between items-center md:items-start gap-2">
          <div className="w-full flex justify-between items-center ">
            <h2 className="text-xl md:text-4xl font-medium">
              {job.companyName}
            </h2>
            <Badge className=" text-xs md:text-base font-bold p-1 md:p-2 rounded bg-blue-950 hover:bg-blue-900">
              {job?.type}
            </Badge>
          </div>
          <div>
            <p className="text-xm md:text-md text-muted-foreground">
              Publicado:{" "}
              {formatDate(job.createdAt as string, "dd, MMMM. HH:mm", {
                locale: ptBR,
              })}
            </p>
            <p className="text-sm md:text-lg font-semibold text-muted-foreground mt-1">
              Rua Tupinambá, Quadra 10, Condominio - Antares, Valparaíso - GO{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 md:p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-2 text-sm md:text-base">
            <UserRound size={18} />
            {getJobTypeDisplayName(job.position)}
          </div>
          <div className="flex gap-2 text-sm md:text-base">
            <CalendarDays />
            Hoje, {job.startTime} às {job.endTime}
          </div>
          <div className="flex gap-2 text-sm md:text-base">
            <CircleDollarSign size={18} />
            Diária: R$ {job.dailyValue}
            {",00 "}
          </div>
          <div className="flex items-center gap-0.5 md:gap-1 flex-wrap">
            <HandCoins size={18} />
            Taxas:
            {taxas &&
              taxas.map((tax, index) => (
                <Badge
                  key={index}
                  variant={"secondary"}
                  className="text-xs px-1"
                >
                  {tax}
                </Badge>
              ))}
          </div>
          <div className="flex gap-2 text-sm md:text-base">
            <Phone size={18} />
            (61) 99999-9999
          </div>
          {/*<div className="flex gap-2 text-sm md:text-base"><MapPin/>Endereço: {job.district},{job.city}, {job.state}</div>*/}
          <div className="col-span-2">
            <Label htmlFor="message">Descrição</Label>
            <p className="min-h-28 text-ellipsis">{job.description}</p>
          </div>
        </div>
        <hr className="border-2 my-2" />
        <div className="flex justify-between py-3 gap-3">
          <a href="/vagas" className="flex items-center gap-1 text-blue-950 hover:text-blue-900" title='Voltar para lista de vagas'>
            <CircleArrowLeft size={28} />
          </a>
        </div>
      </div>
    </div>
  );
}
