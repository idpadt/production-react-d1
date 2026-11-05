"use server";

import { refresh } from "next/cache";
import { pizzaExists, toggleFavorite } from "@/lib/data";
import { shouldFail, simulateLatency } from "@/lib/demo";

export type ActionResult = { ok: true } | { ok: false; error: string };

// Anyone can POST to a Server Action, so treat every argument as untrusted input
export async function toggleFavoriteAction(
  pizzaId: string,
): Promise<ActionResult> {
  if (typeof pizzaId !== "string" || !(await pizzaExists(pizzaId))) {
    return { ok: false, error: "Pizza tidak dikenal." };
  }

  await simulateLatency("write");
  if (await shouldFail()) {
    return { ok: false, error: "Gagal menyimpan favorit. Coba lagi." };
  }

  await toggleFavorite(pizzaId);
  // Re-render the current page on the server: hearts and header update together
  refresh();
  return { ok: true };
}