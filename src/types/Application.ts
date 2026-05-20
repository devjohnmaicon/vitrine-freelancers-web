export type ApplicationStatus = "PENDING" | "VIEWED" | "SELECTED" | "REJECTED";

export const APPLICATION_STATUS_LABEL: Record<ApplicationStatus, string> = {
  PENDING: "Em análise",
  VIEWED: "Visualizado",
  SELECTED: "Selecionado",
  REJECTED: "Não selecionado",
};

export const APPLICATION_STATUS_COLOR: Record<ApplicationStatus, string> = {
  PENDING: "bg-blue-100 text-blue-800",
  VIEWED: "bg-yellow-100 text-yellow-800",
  SELECTED: "bg-green-100 text-green-800",
  REJECTED: "bg-gray-100 text-gray-600",
};

export type Application = {
  id: number;
  jobId: number;
  userId: number;
  jobPosition: string;
  companyName: string;
  userName?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt?: string;
};
