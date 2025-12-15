import { eq } from "drizzle-orm";
import { db } from "@/db";
import { watchListTable } from "@/db/schema/watch-list.table";
import { FestivalTypes } from "@/types/festival.types";

type FavoriteItemInput = Pick<
  FestivalTypes,
  | "contentid"
  | "title"
  | "firstimage"
  | "eventstartdate"
  | "eventenddate"
  | "addr1"
  | "addr2"
  | "tel"
>;

export const createFavorites = async (item: FavoriteItemInput) => {
  const contentId = Number(item.contentid);

  if (Number.isNaN(contentId)) {
    throw new Error("Invalid content id for favorite creation");
  }

  await db.insert(watchListTable).values({
    contentId,
    title: item.title,
    image: item.firstimage || null,
    eventStartDate: item.eventstartdate || null,
    eventEndDate: item.eventenddate || null,
    addr1: item.addr1 || null,
    addr2: item.addr2 || null,
    tel: item.tel || null,
  });
};

export const deleteFavorite = async (contentId: string) => {
  const numericContentId = Number(contentId);

  if (Number.isNaN(numericContentId)) {
    throw new Error("Invalid content id for favorite deletion");
  }

  await db
    .delete(watchListTable)
    .where(eq(watchListTable.contentId, numericContentId));
};
