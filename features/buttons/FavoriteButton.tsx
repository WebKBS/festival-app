import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavoriteStore } from "@/store/useFavorite.store";
import { CardItemType } from "@/components/card/FestivalCard";
import { deleteFavorite } from "@/db/favorites/delete";
import { createFavorites } from "@/db/favorites/create";
import * as Haptics from "expo-haptics";

interface FavoriteButtonProps {
  festival: CardItemType;
}

const FavoriteButton = ({ festival }: FavoriteButtonProps) => {
  const favorites = useFavoriteStore((state) => state.favorites);
  const setFavorites = useFavoriteStore((state) => state.setFavorites);

  const toggleFavorite = async (item: CardItemType) => {
    const newFavorites = new Set(favorites);

    if (newFavorites.has(item.contentid)) {
      try {
        // 좋아요 제거
        await deleteFavorite(item.contentid);

        newFavorites.delete(item.contentid);
      } catch (err) {
        console.error("Error removing favorite:", err);
        return;
      }
    } else {
      // 좋아요 추가

      try {
        await createFavorites(item);
        newFavorites.add(item.contentid);
      } catch (err) {
        console.error("Error adding favorite:", err);
        return;
      }
    }

    setFavorites(newFavorites);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={() => toggleFavorite(festival)}
    >
      <Ionicons
        name={favorites.has(festival.contentid) ? "heart" : "heart-outline"}
        size={24}
        color={favorites.has(festival.contentid) ? "#FF3B30" : "#FFF"}
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
