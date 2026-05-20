import { getJobApplications, updateApplicationStatus } from "@/app/actions/applications-service";
import { getJobById } from "@/app/actions/jobs-service";
import {
  Application,
  APPLICATION_STATUS_LABEL,
  APPLICATION_STATUS_COLOR,
} from "@/types/Application";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CircleArrowLeft, Users } from "lucide-react";
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

function UpdateStatusForm({ applicationId, currentStatus }: { applicationId: number; currentStatus: Application["status"] }) {
  async function handleUpdate(formData: FormData) {
    "use server";
    const status = formData.get("status") as Application["status"];
    await updateApplicationStatus(applicationId, status);
  }

  if (currentStatus === "SELECTED" || currentStatus === "REJECTED") {
    return <StatusBadge status={currentStatus} />;
  }

  return (
    <form action={handleUpdate} className="flex gap-2 items-center">
      <select
        name="status"
        defaultValue={currentStatus}
        className="text-xs border rounded px-2 py-1 bg-white"
      >
        <option value="PENDING">Em análise</option>
        <option value="VIEWED">Visualizado</option>
        <option value="SELECTED">Selecionar</option>
        <option value="REJECTED">Recusar</option>
      </select>
      <button
        type="submit"
        className="text-xs px-2 py-1 bg-blue-950 text-white rounded hover:bg-blue-900"
      >
        Salvar
      </button>
    </form>
  );
}

export default async function CandidatosPage({
  params,
}: {
  params: { id: string };
}) {
  const jobId = Number(params.id);
  const [job, applications] = await Promise.all([
    getJobById(jobId),
    getJobApplications(jobId),
  ]);

  return (
    <div className="max-w-3xl m-auto pb-10 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/vagas/minhas-vagas"
            className="flex items-center gap-1 text-blue-950 hover:text-blue-900 text-sm mb-1"
          >
            <CircleArrowLeft size={18} />
            Minhas Vagas
          </Link>
          <h1 className="text-xl font-semibold">
            {job?.position ?? "Vaga"} — Candidatos
          </h1>
          <p className="text-sm text-muted-foreground">
            {applications.length}{" "}
            {applications.length === 1 ? "candidato" : "candidatos"}
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Users size={40} className="mx-auto mb-3 opacity-40" />
          <p>Nenhum candidato ainda para esta vaga.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app: Application) => (
            <div
              key={app.id}
              className="bg-white border border-zinc-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm"
            >
              <div className="flex flex-col gap-0.5">
                <p className="font-medium text-base">{app.userName}</p>
                <p className="text-xs text-muted-foreground">
                  Candidatou-se em{" "}
                  {formatDate(app.createdAt, "dd/MM/yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <UpdateStatusForm
                applicationId={app.id}
                currentStatus={app.status}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
