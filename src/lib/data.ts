import "server-only";
import { all, get, run } from "./db";
import { simulateLatency } from "./demo";
import type { Pizza, PizzaSize, RatingSummary } from "./types";

interface PizzaRow {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface PriceRow {
  id: string;
  size: PizzaSize;
  price: string;
}

function toPizza(row: PizzaRow, prices: PriceRow[]): Pizza {
  const sizes = { S: 0, M: 0, L: 0 };
  for (const p of prices) {
    if (p.id === row.id) sizes[p.size] = Number(p.price);
  }
  return {
    ...row,
    image: `/pizzas/${row.id}.webp`,
    sizes,
  };
}

const PIZZA_COLUMNS =
  "pizza_type_id AS id, name, category, ingredients AS description";

export async function getPizzas(): Promise<Pizza[]> {
  await simulateLatency("read");
  const [rows, prices] = await Promise.all([
    all<PizzaRow>(`SELECT ${PIZZA_COLUMNS} FROM pizza_types ORDER BY name`),
    all<PriceRow>("SELECT pizza_type_id AS id, size, price FROM pizzas"),
  ]);
  return rows.map((row) => toPizza(row, prices));
}

export async function getPizza(id: string): Promise<Pizza | null> {
  await simulateLatency("read");
  const row = await get<PizzaRow>(
    `SELECT ${PIZZA_COLUMNS} FROM pizza_types WHERE pizza_type_id = ?`,
    [id],
  );
  if (!row) return null;
  const prices = await all<PriceRow>(
    "SELECT pizza_type_id AS id, size, price FROM pizzas WHERE pizza_type_id = ?",
    [id],
  );
  return toPizza(row, prices);
}

export async function pizzaExists(id: string): Promise<boolean> {
  const row = await get<{ id: string }>(
    "SELECT pizza_type_id AS id FROM pizza_types WHERE pizza_type_id = ?",
    [id],
  );
  return row !== undefined;
}

export async function getFavoriteIds(): Promise<string[]> {
  await simulateLatency("read");
  const rows = await all<{ id: string }>(
    "SELECT pizza_type_id AS id FROM favorites",
  );
  return rows.map((r) => r.id);
}

/** Flips the favorite flag and returns the new value. */
export async function toggleFavorite(id: string): Promise<boolean> {
  const existing = await get<{ id: string }>(
    "SELECT pizza_type_id AS id FROM favorites WHERE pizza_type_id = ?",
    [id],
  );
  if (existing) {
    await run("DELETE FROM favorites WHERE pizza_type_id = ?", [id]);
    return false;
  }
  await run("INSERT INTO favorites (pizza_type_id) VALUES (?)", [id]);
  return true;
}

export async function getRatingSummary(id: string): Promise<RatingSummary> {
  await simulateLatency("read");
  const row = await get<{ average: number | null; count: number }>(
    "SELECT AVG(stars) AS average, COUNT(*) AS count FROM ratings WHERE pizza_type_id = ?",
    [id],
  );
  return {
    average: row?.average ? Math.round(row.average * 10) / 10 : 0,
    count: row?.count ?? 0,
  };
}

export async function addRating(id: string, stars: number): Promise<void> {
  await run("INSERT INTO ratings (pizza_type_id, stars) VALUES (?, ?)", [
    id,
    stars,
  ]);
}
