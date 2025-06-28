"use server";
import { Job } from "@/types/Job";
import { RequestResponse } from "@/types/Requests";
import { revalidateTag } from "next/cache";
import { auth } from "../../../auth";
import { DefaultSession, Session } from "next-auth";


interface CustomSession extends DefaultSession {
  user: DefaultSession["user"] & {
    name?: string;
    companyId?: string | number;
  };
  accessToken?: string;
}

const path_url_server = "http://localhost:8080/jobs";

export async function getMyjobs() {
  try {
    const session = (await auth()) as CustomSession | null;

    if (!session || !session.accessToken) {
      console.error("User not authenticated");
      return [];
    }

    const response = await fetch(
      `${path_url_server}/company/${session?.user?.companyId}`,
      {
        next: { revalidate: 30, tags: ["myjobs"] },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: session.accessToken,
        },
      }
    );

    const json: RequestResponse = await response.json();

    return json.data || [];
  } catch (error) {
    console.error("Error in getMyjobs:", error);
    return [];
  }
}

export async function getOpenJobs(page: number = 0, size: number = 10) {
  try {
    const url = `${path_url_server}?page=${page}&size=${size}`;
    const response = await fetch(url, {
      next: { revalidate: 10, tags: ["open-jobs"] },
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching open jobs:", error);
    return [];
  }
}

export async function getJobById(id: string | number) {
  try {
    const response = await fetch(`${path_url_server}/${id}`, {
      next: { revalidate: 60, tags: ["get-job-id"] },
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch job by ID: ${id}, status: ${response.status}`
      );
      return null;
    }

    const json: RequestResponse = await response.json();

    if (json.status_code !== 200) {
      console.error("Error fetching job by ID:", json);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("Network error fetching job by ID:", error);
    return null;
  }
}

export async function deleteJob(id: number) {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) {
      return {
        status: 401,
        error: "User not authenticated",
      };
    }

    const response = await fetch(`${path_url_server}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const json: RequestResponse = await response.json();

    if (!response.ok || json.status_code !== 200) {
      console.error("Error deleting job:", json);
      return {
        status: json.status_code,
        message: json.message,
        error: json.error,
      };
    }

    revalidateTag("myjobs");
    return {
      status: json.status_code,
      message: json.message || "Job deleted successfully",
      error: null,
    };
  } catch (error) {
    console.error("Network error deleting job:", error);
    return {
      status: 500,
      error: "Network error deleting job",
    };
  }
}

export async function createJob(data: Job) {
  try {
    const session = (await auth()) as CustomSession | null;
    if (!session || !session.accessToken) {
      return {
        status: 401,
        error: "User not authenticated",
      };
    }

    const response = await fetch(`${path_url_server}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ ...data, company_id: session.user?.companyId }),
    });

    const json: RequestResponse = await response.json();

    if (!response.ok || json.status_code !== 201) {
      console.error("Error creating job:", json);
      return {
        status: json.status_code,
        message: json.message || "Failed to create job",
        error: json.message,
      };
    }

    revalidateTag("myjobs");
    return {
      status: json.status_code,
      message: json.message || "Job created successfully",
      data: json.data,
      error: null,
    };
  } catch (error) {
    console.error("Network error creating job:", error);
    return {
      status: 500,
      error: "Network error creating job",
    };
  }
}

export async function editJob(jobId: number, data: Job) {
  try {
    const session = (await auth()) as CustomSession | null;
    const response = await fetch(`${path_url_server}/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({ ...data, company_id: session?.user?.companyId }),
    });

    const json = await response.json();

    if (
      !response.ok || (json.status_code !== 200 && json.status_code !== 201 && json.status_code !== 202)
    ) {
      console.error("Error updating job:", json);
      return {
        status: json.status_code,
        error: json.message,
      };
    }

    revalidateTag("myjobs");
    revalidateTag("get-job-id");

    return json.data;
  } catch (error) {
    console.error("Network error updating job:", error);
    return {
      status: 500,
      error: "Network error updating job",
    };
  }
}
