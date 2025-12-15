import { Dimensions, FlatList, Modal, Pressable, View } from "react-native";
import { AppText } from "@/components/text/AppText";
import { Image } from "expo-image";
import React from "react";
import { ImageInfo } from "@/types/image.types";
import { styles } from "@/features/modals/FestivalDetailImageModal.styles";

interface FestivalDetailImageModalProps {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;

  flatListRef: React.RefObject<FlatList | null>;
  modalFlatListRef: React.RefObject<FlatList | null>;

  items: ImageInfo[];
}

const { width, height } = Dimensions.get("window");

const FestivalDetailImageModal = ({
  isModalVisible,
  setModalVisible,
  selectedImageIndex,
  setSelectedImageIndex,
  flatListRef,
  modalFlatListRef,
  items,
}: FestivalDetailImageModalProps) => {
  const NO_IMAGE_URI = require("@/assets/images/common/no-image.png");

  const renderModalItem = ({ item }: any) => {
    const uri = item.originimgurl;
    return (
      <View
        style={[styles.modalImageContainer, { width: width, height: height }]}
      >
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
    <Modal visible={isModalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        {/* 닫기 버튼 */}
        <Pressable style={styles.closeButton} onPress={closeModal}>
          <AppText style={styles.closeButtonText}>✕</AppText>
        </Pressable>

        {/* 카운트 표시 */}
        <View style={styles.countContainer}>
          <AppText style={styles.countText}>
            {selectedImageIndex + 1} / {items.length}
          </AppText>
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
  );
};

export default FestivalDetailImageModal;
