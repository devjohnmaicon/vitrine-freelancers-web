
export type JobType = "FIXO" | "FREELANCER";

export type Job = {
    id?: number;
    type: JobType;
    position: string
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    dailyValue: number;
    taxValues: string;
    requirements?: string;
    open?: boolean;
    createdAt?: string;
    updatedAt?: string;
    companyId?: number;
    companyName?: string;
}

export type CompanyType = {
    id: number;
    name: string;
    logo: string;
    address: AddressType;
}   

export type AddressType = {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
}

