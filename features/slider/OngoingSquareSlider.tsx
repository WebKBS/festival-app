import { useMemo, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { FestivalTypes } from "@/types/festival.types";
import { AppText } from "@/components/text/AppText";

interface Props {
  data: Pick<
    FestivalTypes,
    "contentid" | "title" | "firstimage" | "firstimage2"
  >[];
}

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.78;
const CARD_HEIGHT = CARD_WIDTH * 1.15;
const SIDE_SPACING = (width - CARD_WIDTH) / 2;

const OngoingSquareSlider = ({ data }: Props) => {
  const router = useRouter();

  const sliderData = useMemo(
    () => data.filter((item) => item.firstimage || item.firstimage2),
    [data],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  if (sliderData.length === 0) return null;

  const currentBg = sliderData[currentIndex];
  const backgroundSource =
    currentBg?.firstimage || currentBg?.firstimage2
      ? { uri: currentBg.firstimage || currentBg.firstimage2 }
      : require("@/assets/images/common/no-image.png");

  return (
    <View style={styles.wrapper}>
      {/* 🎨 배경 레이어 */}
      <View style={styles.backgroundLayer} pointerEvents="none">
        <Image
          source={backgroundSource}
          style={styles.backgroundImage}
          blurRadius={10}
          contentFit="cover"
          transition={400}
        />
        <LinearGradient
          colors={[
            "rgba(255,255,255,0.25)",
            "rgba(255,255,255,0.35)",
            "rgba(255,255,255,0.45)",
          ]}
          style={styles.backgroundGradient}
        />
      </View>

      {/* 🎠 Carousel */}
      <Carousel
        width={width}
        height={CARD_HEIGHT + 40}
        data={sliderData}
        loop
        autoPlay
        autoPlayInterval={4000}
        scrollAnimationDuration={600}
        pagingEnabled
        onSnapToItem={(index) => setCurrentIndex(index % sliderData.length)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.88,
          parallaxScrollingOffset: 80, // 50 → 80으로 증가 (옆 카드 더 많이 보임)
        }}
        renderItem={({ item }) => {
          const img = item.firstimage || item.firstimage2;

          return (
            <View style={styles.cardWrapper}>
              <TouchableOpacity
                activeOpacity={0.92}
                onPress={() =>
                  item.contentid && router.push(`/festival/${item.contentid}`)
                }
              >
                <View style={styles.card}>
                  {/* 이미지 */}
                  <Image
                    source={
                      img
                        ? { uri: img }
                        : require("@/assets/images/common/no-image.png")
                    }
                    style={styles.image}
                    contentFit="cover"
                    transition={300}
                  />

                  {/* 글래스모피즘 오버레이 */}
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(0,0,0,0.3)",
                      "rgba(0,0,0,0.7)",
                      "rgba(0,0,0,0.9)",
                    ]}
                    locations={[0, 0.5, 0.8, 1]}
                    style={styles.overlay}
                  />

                  {/* 상단 장식 라인 */}
                  {/*<View style={styles.topAccent} />*/}

                  {/* 제목 영역 */}
                  <View style={styles.titleContainer}>
                    <View style={styles.titleCard}>
                      <View style={styles.badge}>
                        <View style={styles.badgeDot} />
                        <AppText style={styles.badgeText}>진행중</AppText>
                      </View>
                      <View style={styles.divider} />
                      <AppText
                        style={styles.title}
                        numberOfLines={2}
                        weight="bold"
                      >
                        {item.title}
                      </AppText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* 💫 하단 인디케이터 */}
      <View style={styles.paginationContainer}>
        {sliderData.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <View
              key={idx}
              style={[
                styles.paginationDot,
                isActive
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
        {/*<AppText style={styles.pageCounter}>*/}
        {/*  {currentIndex + 1} / {sliderData.length}*/}
        {/*</AppText>*/}
      </View>
    </View>
  );
};

export default OngoingSquareSlider;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 24,
    position: "relative",
  },

  /* 🎨 배경 */
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.2 }],
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  /* 🎴 카드 */
  cardWrapper: {
    width,
    paddingHorizontal: SIDE_SPACING,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#0f172a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  // /* ✨ 상단 장식 */
  // topAccent: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: 4,
  //   backgroundColor: "#3b82f6",
  //   opacity: 0.8,
  // },

  /* 🎭 오버레이 */
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
  },

  /* 📝 제목 */
  titleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  titleCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: -0.3,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 10,
  },
  subtitle: {
    color: "#93c5fd",
    fontSize: 13,
    letterSpacing: 0.5,
    opacity: 0.9,
  },

  /* 🟢 배지 */
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22c55e",
    shadowColor: "#22c55e",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  /* 💫 인디케이터 */
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  paginationDot: {
    height: 4,
    borderRadius: 2,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: "#ffffff",
  },
  paginationDotInactive: {
    width: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  // pageCounter: {
  //   color: "rgba(255, 255, 255, 0.6)",
  //   fontSize: 12,
  //   fontWeight: "600",
  //   letterSpacing: 0.5,
  // },
});
