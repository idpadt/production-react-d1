import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import RatingPanel from "@/components/RatingPanel";
import SizePicker from "@/components/SizePicker";
import { getPizza, getPizzas, getRatingSummary } from "@/lib/data";

// Prerender one static page per pizza at build time
export async function generateStaticParams() {
  const pizzas = await getPizzas();
  return pizzas.map((pizza) => ({ id: pizza.id }));
}

async function Ratings({ pizzaId }: { pizzaId: string }) {
  const summary = await getRatingSummary(pizzaId);
  return <RatingPanel pizzaId={pizzaId} summary={summary} />;
}

export default async function PizzaDetailPage({
  params,
}: PageProps<"/pizza/[id]">) {
  const { id } = await params;
  const pizza = await getPizza(id);

  if (!pizza) {
    notFound();
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
        <Suspense
          fallback={
            <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <h2 className="text-lg font-bold">Rating pelanggan</h2>
              <p className="mt-1 text-ink/70" data-testid="rating-summary">
                Memuat rating…
              </p>
            </section>
          }
        >
          <Ratings pizzaId={pizza.id} />
        </Suspense>
      </div>
    </article>
  );
}
