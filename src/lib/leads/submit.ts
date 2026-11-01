import type { DemoRequest } from "@/types";

export async function submitDemoRequest(request: DemoRequest): Promise<void> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    let message = "Unable to send your request right now.";
    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      // The status is enough when the body is not JSON.
    }
    throw new Error(message);
  }
}
