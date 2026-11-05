"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import type { PizzaSize } from "@/lib/types";

const SIZE_LABELS: Record<PizzaSize, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
};

export default function SizePicker({
  sizes,
}: {
  sizes: Record<PizzaSize, number>;
}) {
  const [size, setSize] = useState<PizzaSize>("M");

  return (
    <div>
      <div className="flex gap-2" role="radiogroup" aria-label="Ukuran">
        {(Object.keys(SIZE_LABELS) as PizzaSize[]).map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={s === size}
            onClick={() => setSize(s)}
            className={`rounded-xl px-4 py-2 font-semibold ring-1 ring-black/10 ${
              s === size ? "bg-brand text-white" : "bg-white"
            }`}
          >
            {SIZE_LABELS[s]}
          </button>
        ))}
      </div>
      <p className="mt-4 text-3xl font-black" data-testid="price">
        {formatPrice(sizes[size])}
      </p>
    </div>
  );
}
