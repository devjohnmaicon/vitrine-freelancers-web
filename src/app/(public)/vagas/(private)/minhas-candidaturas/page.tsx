import { getMyApplications } from "@/app/actions/applications-service";
import { Application, APPLICATION_STATUS_LABEL, APPLICATION_STATUS_COLOR } from "@/types/Application";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CalendarDays, Briefcase, Building2 } from "lucide-react";
import Link from "next/link";

function StatusBadge({ status }: { status: Application["status"] }) {
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${APPLICATION_STATUS_COLOR[status]}`}
    >
      {APPLICATION_STATUS_LABEL[status]}
    </span>
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

  if (applications.length === 0) {
    return (
      <div className="max-w-2xl m-auto mt-10 text-center text-gray-500">
        <Briefcase size={40} className="mx-auto mb-3 opacity-40" />
        <p className="text-lg font-medium">Nenhuma candidatura ainda</p>
        <p className="text-sm mt-1">
          Explore as{" "}
          <Link href="/vagas" className="text-blue-950 underline">
            vagas disponíveis
          </Link>{" "}
          e demonstre interesse.
        </p>
      </div>
    );
  }

  function ApplicationCard({ app }: { app: Application }) {
    return (
      <div className="bg-white border border-zinc-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="font-semibold text-base">{app.jobPosition}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
              <Building2 size={14} />
              {app.companyName}
            </div>
          </div>
          <StatusBadge status={app.status} />
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays size={13} />
          Candidatou-se em{" "}
          {formatDate(app.createdAt, "dd 'de' MMMM, HH:mm", { locale: ptBR })}
        </div>
        <div className="mt-1">
          <Link
            href={`/vagas/detalhes/${app.jobId}`}
            className="text-xs text-blue-950 underline hover:text-blue-800"
          >
            Ver vaga
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl m-auto pb-10 space-y-6">
      <h1 className="text-xl font-semibold">Minhas Candidaturas</h1>

      {active.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Em andamento
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
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Encerradas
          </h2>
          <div className="space-y-3">
            {concluded.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
