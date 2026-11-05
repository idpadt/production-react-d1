import "server-only";
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import sqlite3 from "sqlite3";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "pizza.sqlite");
const SEED_PATH = path.join(DATA_DIR, "pizza.seed.sqlite");

function openDatabase(): Promise<sqlite3.Database> {
  // First run: start from a fresh copy of the seed database
  if (!existsSync(DB_PATH)) {
    copyFileSync(SEED_PATH, DB_PATH);
  }
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) =>
      err ? reject(err) : resolve(db),
    );
  });
}

// Reuse one connection across hot reloads in development
const globalForDb = globalThis as unknown as {
  pizzaDb?: Promise<sqlite3.Database>;
};

function getDb(): Promise<sqlite3.Database> {
  globalForDb.pizzaDb ??= openDatabase();
  return globalForDb.pizzaDb;
}

type Param = string | number | null;

export async function all<T>(sql: string, params: Param[] = []): Promise<T[]> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) =>
      err ? reject(err) : resolve(rows as T[]),
    );
  });
}

export async function get<T>(
  sql: string,
  params: Param[] = [],
): Promise<T | undefined> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) =>
      err ? reject(err) : resolve(row as T | undefined),
    );
  });
}

export async function run(sql: string, params: Param[] = []): Promise<void> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => (err ? reject(err) : resolve()));
  });
}
