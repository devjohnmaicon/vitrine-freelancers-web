"use client";
import { useState } from "react";
import { CheckCircle, Loader2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-gray-100 text-gray-500 text-sm font-medium cursor-not-allowed">
        Vaga encerrada
      </span>
    );
  }

  if (!isLoggedIn) {
    return (
      <a
        href="/login"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-950 text-white text-sm font-medium hover:bg-blue-900 transition-colors"
      >
        <Heart size={16} />
        Tenho Interesse
      </a>
    );
  }

  if (applied) {
    return (
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-green-100 text-green-800 text-sm font-medium">
        <CheckCircle size={16} />
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
    <Button
      onClick={handleApply}
      disabled={loading}
      className="bg-blue-950 hover:bg-blue-900 text-white gap-1.5"
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Enviando...
        </>
      ) : (
        <>
          <Heart size={16} />
          Tenho Interesse
        </>
      )}
    </Button>
  );
}
