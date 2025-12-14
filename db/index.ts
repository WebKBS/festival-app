import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

// LiveQuery를 쓸 거면 enableChangeListener: true 권장
const expo = SQLite.openDatabaseSync("db.db");

export const db = drizzle(expo);
