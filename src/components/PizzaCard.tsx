"use client";

import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { formatPrice, lowestPrice } from "@/lib/format";
import type { Pizza } from "@/lib/types";

export default function PizzaCard({
  pizza,
  isFavorite,
  onToggleFavorite,
}: {
  pizza: Pizza;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <Link href={`/pizza/${pizza.id}`} className="block">
        <Image
          src={pizza.image}
          alt={pizza.name}
          width={400}
          height={400}
          className="aspect-square w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/pizza/${pizza.id}`}
            className="font-bold leading-tight hover:text-brand"
          >
            {pizza.name}
          </Link>
          <FavoriteButton
            pizzaName={pizza.name}
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
          />
        </div>
        <p className="line-clamp-2 text-sm text-ink/70">{pizza.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="rounded-full bg-crust px-2 py-0.5 font-medium">
            {pizza.category}
          </span>
          <span className="font-semibold">
            mulai {formatPrice(lowestPrice(pizza))}
          </span>
        </div>
      </div>
    </article>
  );
}
