import { getJobApplications, updateApplicationStatus } from "@/app/actions/applications-service";
import { getJobById } from "@/app/actions/jobs-service";
import {
  Application,
  APPLICATION_STATUS_LABEL,
  APPLICATION_STATUS_COLOR,
} from "@/types/Application";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ArrowLeft, Users } from "lucide-react";
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

function UpdateStatusForm({
  applicationId,
  currentStatus,
}: {
  applicationId: number;
  currentStatus: Application["status"];
}) {
  async function handleUpdate(formData: FormData) {
    "use server";
    const status = formData.get("status") as Application["status"];
    await updateApplicationStatus(applicationId, status);
  }

  if (currentStatus === "SELECTED" || currentStatus === "REJECTED") {
    return <StatusBadge status={currentStatus} />;
  }

  return (
    <form action={handleUpdate} className="flex items-center gap-2">
      <select
        name="status"
        defaultValue={currentStatus}
        className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-950/20"
      >
        <option value="PENDING">Em análise</option>
        <option value="VIEWED">Visualizado</option>
        <option value="SELECTED">Selecionar</option>
        <option value="REJECTED">Recusar</option>
      </select>
      <button
        type="submit"
        className="text-xs px-3 py-1.5 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/vagas/minhas-vagas"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Minhas Vagas
      </Link>

      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-blue-950 uppercase mb-1">
          Gestão
        </p>
        <h1 className="text-2xl font-bold text-slate-900">
          {job?.position ?? "Vaga"} — Candidatos
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {applications.length}{" "}
          {applications.length === 1
            ? "candidato encontrado"
            : "candidatos encontrados"}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-slate-400">
          <Users size={40} className="opacity-40" />
          <p className="text-slate-500 font-medium">Nenhum candidato ainda</p>
          <p className="text-sm">Aguarde — candidaturas aparecem aqui.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app: Application) => (
            <div
              key={app.id}
              className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-sm transition-shadow"
            >
              <div>
                <p className="font-semibold text-slate-900">{app.userName}</p>
                <p className="text-xs text-slate-400 mt-0.5">
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
