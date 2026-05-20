"use server";
import { Job } from "@/types/Job";
import { revalidateTag } from "next/cache";
import { auth } from "../../../auth";
import { DefaultSession } from "next-auth";
import { apiFetch, BASE_URL } from "@/lib/api-client";

interface CustomSession extends DefaultSession {
  user: DefaultSession["user"] & {
    name?: string;
    companyId?: string | number;
  };
  accessToken?: string;
}

export async function getMyjobs(): Promise<Job[]> {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) return [];

    const IS_MOCK = process.env.NEXT_PUBLIC_API_MOCK === "true";
    const path = IS_MOCK
      ? `/jobs?companyId=${session.user?.companyId}`
      : `/jobs/company/${session.user?.companyId}`;

    const data = await apiFetch<Job[]>(path, {
      token: session.accessToken,
      tags: ["myjobs"],
      revalidate: 30,
    });
    return data ?? [];
  } catch (error) {
    console.error("Error in getMyjobs:", error);
    return [];
  }
}

export async function getOpenJobs(
  page: number = 0,
  size: number = 10
): Promise<Job[]> {
  try {
    const IS_MOCK = process.env.NEXT_PUBLIC_API_MOCK === "true";
    const path = IS_MOCK ? "/jobs" : `/jobs?page=${page}&size=${size}`;
    const data = await apiFetch<Job[]>(path, {
      tags: ["open-jobs"],
      revalidate: 10,
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching open jobs:", error);
    return [];
  }
}

export async function getJobById(id: string | number): Promise<Job | null> {
  try {
    const data = await apiFetch<Job>(`/jobs/${id}`, {
      tags: ["get-job-id"],
      revalidate: 60,
    });
    return data ?? null;
  } catch (error) {
    console.error("Network error fetching job by ID:", error);
    return null;
  }
}

export async function deleteJob(id: number) {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) {
      return { status: 401, error: "User not authenticated" };
    }

    const res = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const json = await res.json();
    revalidateTag("myjobs");
    return {
      status: json.status_code ?? res.status,
      message: json.message ?? "Job deleted",
      error: json.error ?? null,
    };
  } catch (error) {
    console.error("Network error deleting job:", error);
    return { status: 500, error: "Network error deleting job" };
  }
}

export async function createJob(data: Job) {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) {
      return { status: 401, error: "User not authenticated" };
    }

    const result = await apiFetch<Job>("/jobs", {
      method: "POST",
      token: session.accessToken,
      body: { ...data, company_id: session.user?.companyId },
    });

    revalidateTag("myjobs");
    return { status: 201, message: "Job criado com sucesso", data: result, error: null };
  } catch (error: any) {
    console.error("Error creating job:", error);
    return { status: 500, error: error.message ?? "Erro ao criar vaga" };
  }
}

export async function editJob(jobId: number, data: Job) {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) {
      return { status: 401, error: "User not authenticated" };
    }

    const result = await apiFetch<Job>(`/jobs/${jobId}`, {
      method: "PUT",
      token: session.accessToken,
      body: { ...data, company_id: session.user?.companyId },
    });

    revalidateTag("myjobs");
    revalidateTag("get-job-id");
    return result;
  } catch (error: any) {
    console.error("Network error updating job:", error);
    return { status: 500, error: error.message ?? "Erro ao editar vaga" };
  }
}
