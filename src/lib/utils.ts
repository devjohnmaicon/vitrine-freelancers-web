import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getJobTypeDisplayName(jobType: string): string {
  const jobTypeMap: Record<string, string> = {
    deliveryman: "Moto Entregador",
    sushiman: "Sushiman",
    balconista: "Balconista",
    pizzaiolo: "Pizzaiolo",
    bartender: "Bartender",
  }
  
  return jobTypeMap[jobType] || jobType
}