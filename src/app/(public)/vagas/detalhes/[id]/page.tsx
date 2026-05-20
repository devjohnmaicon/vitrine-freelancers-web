import { Job } from "@/types/Job";
import {
  CalendarDays,
  CircleArrowLeft,
  CircleDollarSign,
  Clock,
  MapPin,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getJobById } from "@/app/actions/jobs-service";
import React from "react";
import { Label } from "@/components/ui/label";
import { ptBR } from "date-fns/locale/pt-BR";
import { formatDate, differenceInMinutes } from "date-fns";
import { getJobTypeDisplayName } from "@/lib/utils";
import ApplyButton from "@/components/apply-button";
import { auth } from "../../../../../../auth";
import { DefaultSession } from "next-auth";

interface CustomSession extends DefaultSession {
  user: DefaultSession["user"] & { companyId?: string | number };
  accessToken?: string;
}

function JobTimeBadge({ openUntil }: { openUntil?: string }) {
  if (!openUntil) return null;

  const now = new Date();
  const closeDate = new Date(openUntil);
  const minutesLeft = differenceInMinutes(closeDate, now);

  if (minutesLeft <= 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
        Encerrada
      </span>
    );
  }

  if (minutesLeft < 60) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-semibold animate-pulse">
        <Clock size={12} />
        {minutesLeft} min restantes
      </span>
    );
  }

  const hoursLeft = Math.floor(minutesLeft / 60);

  if (hoursLeft < 4) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
        <Clock size={12} />
        {hoursLeft}h restantes
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
      <Clock size={12} />
      Aberta
    </span>
  );
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const job: Job | null = await getJobById(id);
  const session = (await auth()) as CustomSession | null;

  const isLoggedIn = !!session?.accessToken;
  const isCompany = !!session?.user?.companyId;
  const isClosed = !job?.open;

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Vaga não encontrada.
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-zinc-50 m-auto p-2 md:p-4 rounded-md border border-b-3 border-zinc-300">
      <div className="flex justify-between items-center">
        <h2 className="text-xl py-2 font-semibold">INFORMAÇÕES SOBRE A VAGA</h2>
        <JobTimeBadge openUntil={job.openUntil} />
      </div>
      <hr className="border-2 my-2" />

      <div className="flex gap-2 md:gap-4 py-2">
        <div className="h-32 overflow-hidden flex-shrink-0 rounded-lg bg-blue-100 w-32">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Empresa"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full flex flex-col justify-between items-center md:items-start gap-2">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl md:text-4xl font-medium">{job.companyName}</h2>
            <Badge className="text-xs md:text-base font-bold p-1 md:p-2 rounded bg-blue-950 hover:bg-blue-900">
              {job?.type}
            </Badge>
          </div>
          <div>
            <p className="text-xm md:text-md text-muted-foreground">
              Publicado:{" "}
              {job.createdAt
                ? formatDate(job.createdAt, "dd 'de' MMMM, HH:mm", { locale: ptBR })
                : "—"}
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
            {job.date} — {job.startTime} às {job.endTime}
          </div>
          <div className="flex gap-2 text-sm md:text-base">
            <CircleDollarSign size={18} />
            Diária: R$ {job.dailyValue},00
          </div>
          {job.applicationsCount !== undefined && (
            <div className="flex gap-2 text-sm md:text-base text-muted-foreground">
              {isLoggedIn
                ? `${job.applicationsCount} ${job.applicationsCount === 1 ? "candidato" : "candidatos"}`
                : "Há interessados nesta vaga"}
            </div>
          )}
          <div className="col-span-2 flex gap-2 text-sm md:text-base text-muted-foreground">
            <MapPin size={18} className="flex-shrink-0" />
            {[job as any].map((j) =>
              [j.district, j.city, j.state].filter(Boolean).join(", ")
            )}
          </div>
          <div className="col-span-2">
            <Label htmlFor="description">Descrição</Label>
            <p className="min-h-16 text-sm mt-1">{job.description}</p>
          </div>
          {job.requirements && (
            <div className="col-span-2">
              <Label>Requisitos</Label>
              <p className="text-sm mt-1">{job.requirements}</p>
            </div>
          )}
        </div>

        <hr className="border-2 my-4" />

        <div className="flex justify-between items-center py-1 gap-3">
          <a
            href="/vagas"
            className="flex items-center gap-1 text-blue-950 hover:text-blue-900"
            title="Voltar para lista de vagas"
          >
            <CircleArrowLeft size={28} />
          </a>

          {!isCompany && (
            <ApplyButton
              jobId={Number(job.id)}
              isLoggedIn={isLoggedIn}
              isClosed={isClosed}
            />
          )}

          {isCompany && (
            <a
              href={`/vagas/minhas-vagas/${job.id}/candidatos`}
              className="text-sm text-blue-950 underline hover:text-blue-900"
            >
              Ver candidatos ({job.applicationsCount ?? 0})
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
