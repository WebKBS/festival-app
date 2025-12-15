import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getFestivalDetail } from "@/service/festival/festival-detail";
import { Image } from "expo-image";
import FestivalDetailImageModal from "@/features/modals/FestivalDetailImageModal";

interface FestivalDetailCarouselProps {
  contentId: string;
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width;
export const ITEM_HEIGHT = 420;

const FestivalDetailCarousel = ({ contentId }: FestivalDetailCarouselProps) => {
  const NO_IMAGE_URI = require("@/assets/images/common/no-image.png");

  const { data, isPending } = useQuery({
    queryKey: ["festivalDetail", contentId],
    queryFn: () => getFestivalDetail(contentId),
  });

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const modalFlatListRef = useRef<FlatList>(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalVisible, setModalVisible] = useState(false);

  if (isPending) {
    return null;
  }

  const items = data?.data.images || [];

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
    // 모달이 열릴 때 해당 인덱스로 스크롤
    setTimeout(() => {
      modalFlatListRef.current?.scrollToIndex({ index, animated: false });
    }, 100);
  };

  const renderItem = ({ item, index }: any) => {
    const uri = item.originimgurl;
    return (
      <Pressable onPress={() => openModal(index)}>
        <View style={styles.card}>
          <Image
            source={uri ? { uri } : NO_IMAGE_URI}
            style={[styles.image]}
            priority="high"
            contentFit="cover"
            transition={300}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ paddingBottom: 4 }}>
      {items.length === 0 ? (
        <Image
          source={NO_IMAGE_URI}
          style={[
            {
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
            },
          ]}
          contentFit="cover"
          transition={1000}
        />
      ) : (
        <>
          <Animated.FlatList
            ref={flatListRef}
            data={items}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.serialnum}
            renderItem={renderItem}
            pagingEnabled
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
          />

          <View style={styles.indicatorContainer}>
            {items.map((_, index) => {
              const inputRange = [
                (index - 1) * ITEM_WIDTH,
                index * ITEM_WIDTH,
                (index + 1) * ITEM_WIDTH,
              ];

              const backgroundColor = scrollX.interpolate({
                inputRange,
                outputRange: ["#ccc", "#333", "#ccc"],
                extrapolate: "clamp",
              });

              const animatedStyle = {
                backgroundColor,
              };

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.indicator,
                    { width: ITEM_WIDTH / items.length },
                    animatedStyle,
                  ]}
                />
              );
            })}
          </View>
        </>
      )}

      {/* 확대 이미지 모달 with 슬라이드 */}
      <FestivalDetailImageModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        flatListRef={flatListRef}
        modalFlatListRef={modalFlatListRef}
        items={items}
      />
    </View>
  );
};

export default FestivalDetailCarousel;

const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: ITEM_HEIGHT,
  },
  statusText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  indicatorContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    height: 4,
    backgroundColor: "#ccc",
  },
});
