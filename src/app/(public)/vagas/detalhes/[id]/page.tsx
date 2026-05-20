import { Job } from "@/types/Job";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  Clock,
  MapPin,
  ScrollText,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getJobById } from "@/app/actions/jobs-service";
import { ptBR } from "date-fns/locale/pt-BR";
import { formatDate, differenceInMinutes } from "date-fns";
import { getJobTypeDisplayName } from "@/lib/utils";
import ApplyButton from "@/components/apply-button";
import { auth } from "../../../../../../auth";
import { DefaultSession } from "next-auth";
import Link from "next/link";

interface CustomSession extends DefaultSession {
  user: DefaultSession["user"] & { companyId?: string | number };
  accessToken?: string;
}

function JobTimeBadge({ openUntil }: { openUntil?: string }) {
  if (!openUntil) return null;
  const now = new Date();
  const closeDate = new Date(openUntil);
  const minutesLeft = differenceInMinutes(closeDate, now);

  if (minutesLeft <= 0)
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-medium">
        Encerrada
      </span>
    );
  if (minutesLeft < 60)
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-semibold animate-pulse">
        <Clock size={12} /> {minutesLeft} min restantes
      </span>
    );
  const hoursLeft = Math.floor(minutesLeft / 60);
  if (hoursLeft < 4)
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 font-medium">
        <Clock size={12} /> {hoursLeft}h restantes
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">
      <Clock size={12} /> Aberta
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 gap-3">
        <ScrollText size={40} className="opacity-40" />
        <p className="font-medium">Vaga não encontrada</p>
        <Link href="/vagas" className="text-sm text-blue-950 underline">
          Ver todas as vagas
        </Link>
      </div>
    );
  }

  const address = [(job as any).street, (job as any).district, (job as any).city, (job as any).state]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        href="/vagas"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Voltar para vagas
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Top bar */}
        <div className="bg-blue-950 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-xs font-medium uppercase tracking-wide mb-0.5">
              {job.type}
            </p>
            <h1 className="text-white text-xl font-bold">
              {getJobTypeDisplayName(job.position)}
            </h1>
          </div>
          <JobTimeBadge openUntil={job.openUntil} />
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Company */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <span className="text-blue-950 font-bold text-sm">
                {job.companyName?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">{job.companyName}</p>
              <p className="text-xs text-slate-500">
                Publicado em{" "}
                {job.createdAt
                  ? formatDate(job.createdAt, "dd 'de' MMMM, HH:mm", { locale: ptBR })
                  : "—"}
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoItem icon={<CalendarDays size={15} />} label="Data">
              {job.date} · {job.startTime}–{job.endTime}
            </InfoItem>
            <InfoItem icon={<CircleDollarSign size={15} />} label="Diária">
              R$ {job.dailyValue},00
            </InfoItem>
            {address && (
              <InfoItem icon={<MapPin size={15} />} label="Local" className="col-span-2">
                {address}
              </InfoItem>
            )}
            {isLoggedIn && job.applicationsCount !== undefined && (
              <InfoItem icon={<Users size={15} />} label="Interessados">
                {job.applicationsCount} candidato{job.applicationsCount !== 1 ? "s" : ""}
              </InfoItem>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Descrição
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">{job.description}</p>
          </div>

          {job.requirements && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Requisitos
              </p>
              <p className="text-sm text-slate-700">{job.requirements}</p>
            </div>
          )}

          <hr className="border-slate-100" />

          {/* Actions */}
          <div className="flex items-center justify-between">
            {isCompany ? (
              <Link
                href={`/vagas/minhas-vagas/${job.id}/candidatos`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-950 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Users size={15} />
                Ver candidatos ({job.applicationsCount ?? 0})
              </Link>
            ) : (
              <ApplyButton
                jobId={Number(job.id)}
                isLoggedIn={isLoggedIn}
                isClosed={isClosed}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <p className="flex items-center gap-1 text-xs text-slate-400 font-medium">
        {icon} {label}
      </p>
      <p className="text-sm text-slate-800 font-medium">{children}</p>
    </div>
  );
}
