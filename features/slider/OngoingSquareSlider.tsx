import { useMemo, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FestivalTypes } from "@/types/festival.types";
import { AppText } from "@/components/text/AppText";
import Carousel from "react-native-reanimated-carousel";

interface Props {
  data: Pick<
    FestivalTypes,
    "contentid" | "title" | "firstimage" | "firstimage2"
  >[];
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.78;
const CARD_HEIGHT = CARD_WIDTH;
const SIDE_SPACING = (width - CARD_WIDTH) / 2 + 10;

const OngoingSquareSlider = ({ data }: Props) => {
  const router = useRouter();
  const sliderData = useMemo(
    () => data.filter((item) => item.firstimage || item.firstimage2),
    [data],
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  if (sliderData.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      <Carousel
        width={width}
        height={CARD_HEIGHT}
        data={sliderData}
        loop
        autoPlay
        autoPlayInterval={3000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 36,
        }}
        pagingEnabled
        renderItem={({ item }) => {
          const img = item.firstimage || item.firstimage2;
          return (
            <View style={styles.cardWrapper}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() =>
                  item.contentid && router.push(`/festival/${item.contentid}`)
                }
              >
                <View style={styles.card}>
                  <Image
                    source={
                      img
                        ? { uri: img }
                        : require("@/assets/images/common/no-image.png")
                    }
                    style={styles.image}
                    contentFit="cover"
                    transition={250}
                  />
                  <View style={styles.overlay} />
                  <View style={styles.titleContainer}>
                    <AppText
                      style={styles.title}
                      numberOfLines={2}
                      weight="bold"
                    >
                      {item.title}
                    </AppText>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.indicatorRow}>
        {sliderData.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.indicator,
              idx === currentIndex && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default OngoingSquareSlider;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingBottom: 16,
  },
  cardWrapper: {
    width,
    paddingHorizontal: SIDE_SPACING,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#0f172a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  titleContainer: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
  },
  indicatorRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e5e7eb",
    opacity: 0.5,
  },
  indicatorActive: {
    width: 18,
    borderRadius: 9,
    backgroundColor: "#2563eb",
    opacity: 1,
  },
});
