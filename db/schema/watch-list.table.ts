import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const watchListTable = sqliteTable("watch_list", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  contentId: integer("content_id").notNull(),
  title: text("title").notNull(),
  image: text("image"),
  eventStartDate: text("event_start_date"),
  eventEndDate: text("event_end_date"),
  addr1: text("addr1"),
  addr2: text("addr2"),
  tel: text("tel"),
});

export type WatchListTable = typeof watchListTable.$inferSelect;
