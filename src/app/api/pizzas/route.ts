import { getPizzas } from "@/lib/data";

export async function GET() {
  const pizzas = await getPizzas();
  return Response.json(pizzas);
}
