import Image from "next/image";
import Link from "next/link";
import DismissibleBanner from "@/components/DismissibleBanner";
import { getPizzaOfTheDay } from "@/lib/data";
import { formatPrice, lowestPrice } from "@/lib/format";

export default async function PizzaOfTheDay() {
  const pizza = await getPizzaOfTheDay();

  return (
    <DismissibleBanner>
      <Image
        src={pizza.image}
        alt={pizza.name}
        width={96}
        height={96}
        className="size-24 rounded-xl object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
          Pizza of the Day
        </p>
        <Link
          href={`/pizza/${pizza.id}`}
          className="text-xl font-black hover:underline"
        >
          {pizza.name}
        </Link>
        <p className="text-sm">mulai {formatPrice(lowestPrice(pizza))}</p>
      </div>
    </DismissibleBanner>
  );
}

