// Restores data/pizza.sqlite from the seed. Stop `npm run dev` first.
import { copyFileSync } from "node:fs";

copyFileSync("data/pizza.seed.sqlite", "data/pizza.sqlite");
console.log("Database reset from data/pizza.seed.sqlite");
