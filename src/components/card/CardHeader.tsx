import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Job } from "@/types/Job";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Clock } from "lucide-react";
import { differenceInMinutes } from "date-fns";

interface CardHeaderProps {
  image?: string;
  jobData: Job;
}

function TimeTag({ openUntil }: { openUntil?: string }) {
  if (!openUntil) return null;
  const mins = differenceInMinutes(new Date(openUntil), new Date());
  if (mins <= 0) return <span className="text-xs text-slate-400">Encerrada</span>;
  if (mins < 60)
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
        <Clock size={11} className="animate-pulse" /> {mins}min
      </span>
    );
  if (mins < 240)
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
        <Clock size={11} /> {Math.floor(mins / 60)}h
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
      <Clock size={11} /> Aberta
    </span>
  );
}

const CardHeader = ({ image, jobData }: CardHeaderProps) => {
  const initials = jobData.companyName
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() ?? "?";

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-11 w-11 rounded-lg border border-slate-100 flex-shrink-0">
        <AvatarImage src={image} />
        <AvatarFallback className="rounded-lg bg-blue-950 text-white text-xs font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="font-semibold text-slate-900 text-base leading-tight truncate">
            {jobData.companyName}
          </h2>
          <Badge className="bg-blue-950 hover:bg-blue-900 text-white text-[11px] px-2 py-0 h-5 shrink-0">
            {jobData.type}
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          {jobData.createdAt
            ? formatDate(jobData.createdAt, "dd 'de' MMM, HH:mm", { locale: ptBR })
            : "—"}
        </p>
      </div>

      <TimeTag openUntil={jobData.openUntil} />
    </div>
  );
};

export default CardHeader;
