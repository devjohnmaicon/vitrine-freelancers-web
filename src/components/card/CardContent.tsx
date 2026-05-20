import { CalendarDays, CircleDollarSign, MapPin, UserRound } from "lucide-react";
import { Job } from "@/types/Job";
import { getJobTypeDisplayName } from "@/lib/utils";

interface CardContentProps {
  children: React.ReactNode;
  jobData: Job;
}

const CardContent = ({ children, jobData }: CardContentProps) => {
  const location = [(jobData as any).city, (jobData as any).state]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mt-3">
      <p className="text-sm font-semibold text-slate-800 mb-2">
        {getJobTypeDisplayName(jobData.position)}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <CalendarDays size={13} />
          {jobData.date} · {jobData.startTime}–{jobData.endTime}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <CircleDollarSign size={13} />
          R$ {jobData.dailyValue},00
        </span>
        {location && (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={13} />
            {location}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default CardContent;
