"use client";

import { use, useState } from "react";

export default function FavoriteButton({
  pizzaId,
  pizzaName,
  favoriteIdsPromise,
}: {
  pizzaId: string;
  pizzaName: string;
  favoriteIdsPromise: Promise<string[]>;
}) {
  // Suspends until the server streams the favorites in
  const favoriteIds = use(favoriteIdsPromise);
  const [isFavorite, setIsFavorite] = useState(favoriteIds.includes(pizzaId));
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    setError(null);
    const res = await fetch(`/api/favorites/${pizzaId}`, { method: "POST" });
    if (!res.ok) {
      setError("Gagal menyimpan favorit. Coba lagi.");
      return;
    }
    const body = (await res.json()) as { isFavorite: boolean };
    setIsFavorite(body.isFavorite);
    window.dispatchEvent(new Event("favorites-changed"));
  }

  return (
    <div className="flex shrink-0 flex-col items-end">
      <button
        type="button"
        onClick={() => void toggle()}
        aria-pressed={isFavorite}
        aria-label={`${isFavorite ? "Hapus" : "Tambah"} ${pizzaName} ${isFavorite ? "dari" : "ke"} favorit`}
        className="text-2xl leading-none text-brand"
      >
        {isFavorite ? "♥" : "♡"}
      </button>
      {error && (
        <p role="alert" className="mt-1 max-w-32 text-right text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}