import "server-only";
import { cookies } from "next/headers";

// Classroom helpers: make latency and failures visible on demand.
// DEMO_READ_LATENCY_MS / DEMO_WRITE_LATENCY_MS can be changed in .env.local

const DEFAULT_LATENCY = { read: 300, write: 800 };

export async function simulateLatency(kind: "read" | "write") {
  const fromEnv =
    kind === "read"
      ? process.env.DEMO_READ_LATENCY_MS
      : process.env.DEMO_WRITE_LATENCY_MS;
  const ms = fromEnv ? Number(fromEnv) : DEFAULT_LATENCY[kind];
  if (ms > 0) await new Promise((resolve) => setTimeout(resolve, ms));
}

/** True when the "Simulasi gagal" switch in the footer is on. */
export async function shouldFail(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("pg-fail")?.value === "1";
}
