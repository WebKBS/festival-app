import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { startTransition, useMemo, useOptimistic } from "react";
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

  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
    isFavorite,
    (_, next: boolean) => next,
  );

  const toggleFavorite = async (item: CardItemType) => {
    if (!isValidContentId) return;

    const nextState = !optimisticFavorite;

    startTransition(() => {
      setOptimisticFavorite(nextState);
    });

    try {
      if (nextState) {
        await createFavorites(item);
      } else {
        await deleteFavorite(item.contentid);
      }

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (err) {
      console.error(
        nextState ? "Error adding favorite:" : "Error removing favorite:",
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
        name={optimisticFavorite ? "heart" : "heart-outline"}
        size={24}
        color={optimisticFavorite ? "#FF3B30" : "#FFF"}
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
