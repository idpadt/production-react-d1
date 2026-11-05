"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RatingPanel from "@/components/RatingPanel";
import SizePicker from "@/components/SizePicker";
import type { Pizza } from "@/lib/types";

export default function PizzaDetail() {
  const { id } = useParams<{ id: string }>();
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">(
    "loading",
  );

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/pizzas/${id}`);
      if (!res.ok) {
        setStatus("missing");
        return;
      }
      setPizza((await res.json()) as Pizza);
      setStatus("ready");
    }
    void load();
  }, [id]);

  if (status === "loading") {
    return <p className="py-16 text-center text-lg">Memuat pizza…</p>;
  }

  if (status === "missing" || !pizza) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold">Pizza tidak ditemukan</h1>
        <Link href="/" className="mt-4 inline-block text-brand underline">
          Kembali ke menu
        </Link>
      </div>
    );
  }

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <Image
        src={pizza.image}
        alt={pizza.name}
        width={600}
        height={600}
        priority
        className="aspect-square w-full rounded-3xl object-cover shadow"
      />
      <div className="flex flex-col gap-6">
        <div>
          <Link href="/" className="text-sm text-brand underline">
            ← Menu
          </Link>
          <h1 className="mt-2 text-4xl font-black">{pizza.name}</h1>
          <p className="mt-1 font-medium text-ink/60">{pizza.category}</p>
        </div>
        <p className="text-lg">{pizza.description}</p>
        <SizePicker sizes={pizza.sizes} />
        <RatingPanel pizzaId={pizza.id} />
      </div>
    </article>
  );
}
