"use client";

import { useState } from "react";
import MenuToolbar from "@/components/MenuToolbar";
import PizzaCard from "@/components/PizzaCard";
import { filterPizzas } from "@/lib/format";
import type { Pizza } from "@/lib/types";

export default function MenuExplorer({
  pizzas,
  initialFavoriteIds,
}: {
  pizzas: Pizza[];
  initialFavoriteIds: string[];
}) {
  const [favoriteIds, setFavoriteIds] = useState(initialFavoriteIds);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  async function toggleFavorite(id: string) {
    setError(null);
    const res = await fetch(`/api/favorites/${id}`, { method: "POST" });
    if (!res.ok) {
      setError("Gagal menyimpan favorit. Coba lagi.");
      return;
    }
    const { isFavorite } = (await res.json()) as { isFavorite: boolean };
    setFavoriteIds((ids) =>
      isFavorite ? [...ids, id] : ids.filter((x) => x !== id),
    );
    window.dispatchEvent(new Event("favorites-changed"));
  }

  const visible = filterPizzas(pizzas, query, category);

  return (
    <>
      <MenuToolbar
        query={query}
        category={category}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
      />
      {error && (
        <p role="alert" className="mb-4 rounded-xl bg-red-100 px-4 py-2 text-red-800">
          {error}
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            isFavorite={favoriteIds.includes(pizza.id)}
            onToggleFavorite={() => void toggleFavorite(pizza.id)}
          />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="py-16 text-center">Tidak ada pizza yang cocok.</p>
      )}
    </>
  );
}