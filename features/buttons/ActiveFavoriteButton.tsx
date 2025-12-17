import { Animated, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { startTransition, useOptimistic, useRef } from "react";
import { DetailInfo } from "@/types/detail.types";
import HapticsButton from "@/features/buttons/HapticsButton";
import { createFavorites, deleteFavorite } from "@/db/watch-list";
import { db } from "@/db";
import { watchListTable } from "@/db/schema/watch-list.table";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import * as Haptics from "expo-haptics";

interface ActiveFavoriteButtonProps {
  contentId: string; // 선택적으로 contentId를 받을 수 있도록 변경
  festival: DetailInfo;
  eventStartDate: string; // 선택적으로 eventStartDate를 받을 수 있도록 변경
  eventEndDate: string; // 선택적으로 eventEndDate를 받을 수 있도록 변경
}

const ActiveFavoriteButton = ({
  contentId,
  festival,
  eventStartDate,
  eventEndDate,
}: ActiveFavoriteButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /** DB 상태 */
  const favoriteQuery = db
    .select()
    .from(watchListTable)
    .where(eq(watchListTable.contentId, Number(contentId)));

  const { data } = useLiveQuery(favoriteQuery);
  const isFavorite = (data?.length || 0) > 0;

  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
    isFavorite,
    (_, next: boolean) => next,
  );

  const toggleFavorite = async () => {
    const nextState = !optimisticFavorite;

    startTransition(() => {
      setOptimisticFavorite(nextState);
    });

    try {
      if (nextState) {
        await createFavorites({
          title: festival.title || "",
          contentid: contentId,
          addr1: festival.addr1 || "",
          addr2: festival.addr2 || "",
          eventstartdate: eventStartDate,
          eventenddate: eventEndDate,
          tel: festival.tel || "",
          firstimage: festival.firstimage || "",
        });
      } else {
        await deleteFavorite(contentId);
      }

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.error("Favorite toggle failed:", error);
    }

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <HapticsButton
        style={({ pressed }) => [
          styles.button,
          styles.likeButton,
          optimisticFavorite && styles.likedButton,
          { opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={toggleFavorite}
      >
        <MaterialIcons
          name={optimisticFavorite ? "favorite" : "favorite-border"}
          size={22}
          color={optimisticFavorite ? "#FF3B30" : "#a1a1a1"}
        />
      </HapticsButton>
    </Animated.View>
  );
};

export default ActiveFavoriteButton;

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(247, 247, 247, 0.8)",
    marginVertical: 4,
  },

  likeButton: {
    backgroundColor: "rgba(102, 102, 102, 0.1)",
  },

  likedButton: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
});
