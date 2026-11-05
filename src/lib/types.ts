export type PizzaSize = "S" | "M" | "L";

export interface Pizza {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  sizes: Record<PizzaSize, number>;
}

export interface RatingSummary {
  average: number;
  count: number;
}
