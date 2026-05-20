"use server";
import { Application, ApplicationStatus } from "@/types/Application";
import { auth } from "../../../auth";
import { DefaultSession } from "next-auth";
import { apiFetch } from "@/lib/api-client";
import { revalidateTag } from "next/cache";

interface CustomSession extends DefaultSession {
  user: DefaultSession["user"] & {
    name?: string;
    companyId?: string | number;
    id?: string | number;
  };
  accessToken?: string;
}

const IS_MOCK = process.env.NEXT_PUBLIC_API_MOCK === "true";

export async function applyToJob(jobId: number) {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) {
      return { status: 401, error: "Você precisa estar logado para se candidatar" };
    }

    const result = await apiFetch<Application>("/applications", {
      method: "POST",
      token: session.accessToken,
      body: { jobId },
    });

    revalidateTag("my-applications");
    return { status: 201, data: result, error: null };
  } catch (error: any) {
    const isConflict = error.message?.includes("409");
    return {
      status: isConflict ? 409 : 500,
      error: isConflict
        ? "Você já se candidatou a esta vaga"
        : "Erro ao enviar candidatura",
    };
  }
}

export async function getMyApplications(): Promise<Application[]> {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) return [];

    const path = IS_MOCK
      ? `/applications?userId=10`
      : "/applications/my";

    const data = await apiFetch<Application[]>(path, {
      token: session.accessToken,
      tags: ["my-applications"],
      revalidate: 30,
    });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export async function getJobApplications(jobId: number): Promise<Application[]> {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) return [];

    const path = IS_MOCK
      ? `/applications?jobId=${jobId}`
      : `/applications/job/${jobId}`;

    const data = await apiFetch<Application[]>(path, {
      token: session.accessToken,
      tags: [`job-applications-${jobId}`],
      revalidate: 0,
    });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return [];
  }
}

export async function updateApplicationStatus(
  applicationId: number,
  status: ApplicationStatus
) {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) {
      return { status: 401, error: "Não autorizado" };
    }

    const result = await apiFetch<Application>(
      `/applications/${applicationId}/status`,
      {
        method: "PATCH",
        token: session.accessToken,
        body: { status },
      }
    );

    revalidateTag(`job-applications-${result.jobId}`);
    return { status: 200, data: result, error: null };
  } catch (error: any) {
    return { status: 500, error: "Erro ao atualizar status" };
  }
}
