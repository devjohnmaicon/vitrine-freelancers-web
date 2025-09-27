import React from "react";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/Job";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "date-fns";
import {ptBR} from "date-fns/locale/pt-BR";

interface CardHeaderProps {
  image?: string;
  jobData: Job;
}

const CardHeader = ({ image, jobData }: CardHeaderProps) => {
  const bgBadge = jobData.open
    ? "bg-blue-950 hover:bg-blue-900"
    : "bg-zinc-500 hover:bg-zinc-500";

  return (
    <div className="relative flex items-center gap-2 md:gap-4">
      <Avatar className="h-10  md:h-14 w-10 md:w-14">
        <AvatarImage src={image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="py-1 md:py-0">
        <h2 className="card-title font-bold sm:text-xl md:text-2xl">
          {jobData.companyName}
        </h2>
        <p className="text-xs md:text-base text-muted-foreground mt-1">
          Publicado: {formatDate(jobData.createdAt as string, "dd, MMMM. HH:mm", { locale: ptBR })}
        </p>
      </div>

      <Badge
        className={`absolute top-1 right-1 text-[12px] md:text-lg px-1 md:px-3 py-0 sm:py-1 ${bgBadge}`}
      >
        {jobData.type}
      </Badge>
    </div>
  );
};

export default CardHeader;
