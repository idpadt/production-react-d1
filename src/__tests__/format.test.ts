import { describe, expect, test } from "vitest";
import { filterPizzas, formatPrice, lowestPrice, parseStars } from "@/lib/format";
import type { Pizza } from "@/lib/types";

const pizzas: Pizza[] = [
  {
    id: "pepperoni",
    name: "The Pepperoni Pizza",
    category: "Classic",
    description: "Mozzarella Cheese, Pepperoni",
    image: "/pizzas/pepperoni.webp",
    sizes: { S: 9.75, M: 12.5, L: 15.25 },
  },
  {
    id: "green_garden",
    name: "The Green Garden Pizza",
    category: "Veggie",
    description: "Spinach, Mushrooms, Tomatoes, Green Olives",
    image: "/pizzas/green_garden.webp",
    sizes: { S: 12, M: 16, L: 20.25 },
  },
];

describe("formatPrice / lowestPrice", () => {
  test("formats USD", () => {
    expect(formatPrice(12.5)).toBe("$12.50");
  });
  test("picks the cheapest size", () => {
    expect(lowestPrice(pizzas[0])).toBe(9.75);
  });
});

describe("filterPizzas", () => {
  test("matches name or topping, case-insensitive", () => {
    expect(filterPizzas(pizzas, "MUSHROOM", "All").map((p) => p.id)).toEqual([
      "green_garden",
    ]);
  });
  test("filters by category", () => {
    expect(filterPizzas(pizzas, "", "Classic").map((p) => p.id)).toEqual([
      "pepperoni",
    ]);
  });
});

describe("parseStars", () => {
  test("accepts 1–5 as number or string", () => {
    expect(parseStars(4)).toBe(4);
    expect(parseStars("5")).toBe(5);
  });
  test("rejects everything else", () => {
    for (const bad of [0, 6, 2.5, "abc", null, undefined, "", []]) {
      expect(parseStars(bad)).toBeNull();
    }
  });
});
