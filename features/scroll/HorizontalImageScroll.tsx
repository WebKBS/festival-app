import React, { memo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FestivalTypes } from "@/types/festival.types";
import { blurhash } from "@/constants/images/imageBlur";

interface Props {
  data: Pick<
    FestivalTypes,
    "contentId" | "title" | "firstImage" | "firstImage2"
  >[];
  title?: string;
}

const HorizontalImageScroll = ({ data, title }: Props) => {
  const router = useRouter();

  if (!data || data.length === 0) return null;

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) =>
          (item.contentId || String(index)) + "-scroll"
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const img = item.firstImage || item.firstImage2;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                item.contentId && router.push(`/festival/${item.contentId}`)
              }
              style={styles.card}
            >
              <Image
                source={
                  img
                    ? { uri: img }
                    : require("@/assets/images/common/no-image.png")
                }
                style={styles.image}
                contentFit={img ? "cover" : "contain"}
                placeholder={{ blurhash }}
                transition={200}
              />
              {!!item.title && (
                <Text numberOfLines={1} style={styles.caption}>
                  {item.title}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default memo(HorizontalImageScroll);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  listContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  card: {
    width: 240,
    marginRight: 12,
  },
  image: {
    width: 240,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  caption: {
    marginTop: 6,
    fontSize: 14,
    color: "#333",
  },
});
