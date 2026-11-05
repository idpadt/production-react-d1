import type { Pizza } from "./types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value: number): string {
  return usd.format(value);
}

export function lowestPrice(pizza: Pizza): number {
  return Math.min(...Object.values(pizza.sizes).filter((p) => p > 0));
}

export function filterPizzas(
  pizzas: Pizza[],
  query: string,
  category: string,
): Pizza[] {
  const q = query.trim().toLowerCase();
  return pizzas.filter((pizza) => {
    const matchesCategory = category === "All" || pizza.category === category;
    const matchesQuery =
      q === "" ||
      pizza.name.toLowerCase().includes(q) ||
      pizza.description.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

/** Returns a whole number 1–5, or null for anything else. */
export function parseStars(value: unknown): number | null {
  const n = typeof value === "string" ? Number(value) : value;
  if (typeof n !== "number" || !Number.isInteger(n)) return null;
  return n >= 1 && n <= 5 ? n : null;
}
