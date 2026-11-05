"use client";

import { useState } from "react";
import MenuToolbar from "@/components/MenuToolbar";
import PizzaCard from "@/components/PizzaCard";
import { filterPizzas } from "@/lib/format";
import type { Pizza } from "@/lib/types";

export default function MenuExplorer({
  pizzas,
  favoriteIdsPromise,
}: {
  pizzas: Pizza[];
  favoriteIdsPromise: Promise<string[]>;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const visible = filterPizzas(pizzas, query, category);

  return (
    <>
      <MenuToolbar
        query={query}
        category={category}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            favoriteIdsPromise={favoriteIdsPromise}
          />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="py-16 text-center">Tidak ada pizza yang cocok.</p>
      )}
    </>
  );
}