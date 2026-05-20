import { getMyApplications } from "@/app/actions/applications-service";
import {
  Application,
  APPLICATION_STATUS_LABEL,
  APPLICATION_STATUS_COLOR,
} from "@/types/Application";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Briefcase, Building2, CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";

function StatusBadge({ status }: { status: Application["status"] }) {
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${APPLICATION_STATUS_COLOR[status]}`}
    >
      {APPLICATION_STATUS_LABEL[status]}
    </span>
  );
}

function ApplicationCard({ app }: { app: Application }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900">{app.jobPosition}</p>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-0.5">
            <Building2 size={13} />
            {app.companyName}
          </div>
        </div>
        <StatusBadge status={app.status} />
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <CalendarDays size={12} />
          {formatDate(app.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
        </div>
        <Link
          href={`/vagas/detalhes/${app.jobId}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-950 hover:underline"
        >
          Ver vaga <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export default async function MinhasCandidaturasPage() {
  const applications: Application[] = await getMyApplications();

  const active = applications.filter(
    (a) => a.status === "PENDING" || a.status === "VIEWED"
  );
  const concluded = applications.filter(
    (a) => a.status === "SELECTED" || a.status === "REJECTED"
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-blue-950 uppercase mb-1">
          Meu perfil
        </p>
        <h1 className="text-2xl font-bold text-slate-900">Minhas Candidaturas</h1>
        <p className="text-sm text-slate-500 mt-1">
          Acompanhe o status de todas as suas candidaturas.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-slate-400">
          <Briefcase size={40} className="opacity-40" />
          <p className="font-medium text-slate-500">Nenhuma candidatura ainda</p>
          <Link
            href="/vagas"
            className="text-sm text-blue-950 font-medium hover:underline"
          >
            Explorar vagas disponíveis
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {active.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Em andamento · {active.length}
              </h2>
              <div className="space-y-3">
                {active.map((app) => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          )}
          {concluded.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Encerradas · {concluded.length}
              </h2>
              <div className="space-y-3">
                {concluded.map((app) => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
