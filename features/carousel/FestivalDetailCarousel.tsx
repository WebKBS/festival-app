import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getFestivalDetail } from "@/service/festival/festival-detail";
import { Image } from "expo-image";

interface FestivalDetailCarouselProps {
  contentId: string;
}

const { width, height } = Dimensions.get("window");
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

  const renderModalItem = ({ item }: any) => {
    const uri = item.originimgurl;
    return (
      <View style={styles.modalImageContainer}>
        <Image
          source={uri ? { uri } : NO_IMAGE_URI}
          style={styles.fullscreenImage}
          contentFit="contain"
        />
      </View>
    );
  };

  const onModalScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setSelectedImageIndex(currentIndex);
  };

  const closeModal = () => {
    setModalVisible(false);
    // 모달 닫을 때 메인 슬라이드를 현재 모달 인덱스와 동기화
    flatListRef.current?.scrollToIndex({
      index: selectedImageIndex,
      animated: false,
    });
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
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          {/* 닫기 버튼 */}
          <Pressable style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>

          {/* 카운트 표시 */}
          <View style={styles.countContainer}>
            <Text style={styles.countText}>
              {selectedImageIndex + 1} / {items.length}
            </Text>
          </View>

          {/* 이미지 슬라이더 */}
          <FlatList
            ref={modalFlatListRef}
            data={items}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.serialnum}
            renderItem={renderModalItem}
            onScroll={onModalScroll}
            scrollEventThrottle={16}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />

          {/* 모달 인디케이터 */}
          <View style={styles.modalIndicatorContainer}>
            {items.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.modalIndicator,
                  {
                    backgroundColor:
                      index === selectedImageIndex ? "#fff" : "#666",
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImageContainer: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Pretendard-Bold",
  },
  countContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  countText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  modalIndicatorContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
