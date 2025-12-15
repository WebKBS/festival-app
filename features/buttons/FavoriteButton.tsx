import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { useMemo } from "react";
import { CardItemType } from "@/components/card/FestivalCard";
import { createFavorites, deleteFavorite } from "@/db/watch-list";
import { db } from "@/db";
import { watchListTable } from "@/db/schema/watch-list.table";
import * as Haptics from "expo-haptics";

interface FavoriteButtonProps {
  festival: CardItemType;
}

const FavoriteButton = ({ festival }: FavoriteButtonProps) => {
  const contentId = useMemo(
    () => Number(festival.contentid),
    [festival.contentid],
  );
  const isValidContentId = Number.isFinite(contentId);
  const queryContentId = isValidContentId ? contentId : -1;

  const favoriteQuery = useMemo(
    () =>
      db
        .select()
        .from(watchListTable)
        .where(eq(watchListTable.contentId, queryContentId)),
    [queryContentId],
  );

  const { data } = useLiveQuery(favoriteQuery);
  const isFavorite = isValidContentId && (data?.length || 0) > 0;

  const toggleFavorite = async (item: CardItemType) => {
    if (!isValidContentId) return;

    try {
      if (isFavorite) {
        await deleteFavorite(item.contentid);
      } else {
        await createFavorites(item);
      }

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (err) {
      console.error(
        isFavorite ? "Error removing favorite:" : "Error adding favorite:",
        err,
      );
    }
  };
  return (
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={() => toggleFavorite(festival)}
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "#FF3B30" : "#FFF"}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: 6,
  },
});
