"use client";

import { use, useOptimistic, useState, useTransition } from "react";
import { toggleFavoriteAction } from "@/app/actions";

export default function FavoriteButton({
  pizzaId,
  pizzaName,
  favoriteIdsPromise,
}: {
  pizzaId: string;
  pizzaName: string;
  favoriteIdsPromise: Promise<string[]>;
}) {
  // The server's truth: streamed in, refreshed after every successful action
  const isFavorite = use(favoriteIdsPromise).includes(pizzaId);
  // What we show while the action is in flight
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(isFavorite);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);
    startTransition(async () => {
      setOptimisticFavorite(!optimisticFavorite);
      const result = await toggleFavoriteAction(pizzaId);
      // On failure the transition ends, so the heart snaps back by itself
      if (!result.ok) setError(result.error);
    });
  }

  return (
    <div className="flex shrink-0 flex-col items-end">
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={optimisticFavorite}
        aria-busy={isPending}
        aria-label={`${optimisticFavorite ? "Hapus" : "Tambah"} ${pizzaName} ${optimisticFavorite ? "dari" : "ke"} favorit`}
        className={`text-2xl leading-none text-brand transition-opacity ${
          isPending ? "opacity-50" : ""
        }`}
      >
        {optimisticFavorite ? "♥" : "♡"}
      </button>
      {error && (
        <p role="alert" className="mt-1 max-w-32 text-right text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}