"use client";
import { useState } from "react";
import { CheckCircle, Heart, Loader2, LogIn } from "lucide-react";
import { applyToJob } from "@/app/actions/applications-service";
import { toast } from "sonner";

type Props = {
  jobId: number;
  alreadyApplied?: boolean;
  isLoggedIn: boolean;
  isClosed?: boolean;
};

export default function ApplyButton({
  jobId,
  alreadyApplied = false,
  isLoggedIn,
  isClosed = false,
}: Props) {
  const [applied, setApplied] = useState(alreadyApplied);
  const [loading, setLoading] = useState(false);

  if (isClosed) {
    return (
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 text-slate-400 text-sm font-medium">
        Vaga encerrada
      </span>
    );
  }

  if (!isLoggedIn) {
    return (
      <a
        href="/login"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-950 text-white text-sm font-medium hover:bg-blue-900 transition-colors"
      >
        <LogIn size={15} />
        Entrar para candidatar-se
      </a>
    );
  }

  if (applied) {
    return (
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200">
        <CheckCircle size={15} />
        Candidatura enviada
      </span>
    );
  }

  async function handleApply() {
    setLoading(true);
    const result = await applyToJob(jobId);
    setLoading(false);

    if (result.status === 201) {
      setApplied(true);
      toast.success("Candidatura registrada!", {
        description: "Acompanhe o status em Minhas Candidaturas.",
        action: {
          label: "Ver",
          onClick: () => (window.location.href = "/vagas/minhas-candidaturas"),
        },
      });
    } else if (result.status === 409) {
      setApplied(true);
      toast.info("Você já se candidatou a esta vaga.");
    } else {
      toast.error(result.error ?? "Erro ao enviar candidatura.");
    }
  }

  return (
    <button
      onClick={handleApply}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-950 text-white text-sm font-medium hover:bg-blue-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 size={15} className="animate-spin" />
          Enviando...
        </>
      ) : (
        <>
          <Heart size={15} />
          Tenho Interesse
        </>
      )}
    </button>
  );
}
