import { Dimensions, FlatList, Modal, Pressable, View } from "react-native";
import { AppText } from "@/components/text/AppText";
import React, { useState } from "react";
import { ImageInfo } from "@/types/image.types";
import { styles } from "@/features/modals/FestivalDetailImageModal.styles";
import ZoomableImage from "@/features/images/ZoomableImage";

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
  const [isScrollEnabled, setScrollEnabled] = useState(true); // 스크롤 제어 상태

  const renderModalItem = ({ item }: any) => {
    return (
      <View
        style={[styles.modalImageContainer, { width: width, height: height }]}
      >
        <ZoomableImage
          uri={item.originimgurl}
          onZoomStatusChange={(isZoomed) => {
            // 줌 상태이면 스크롤 비활성화 (반대 논리)
            setScrollEnabled(!isZoomed);
          }}
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
    flatListRef.current?.scrollToIndex({
      index: selectedImageIndex,
      animated: false,
    });
    setScrollEnabled(true);
  };

  return (
    <Modal visible={isModalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <Pressable style={styles.closeButton} onPress={closeModal}>
          <AppText style={styles.closeButtonText}>✕</AppText>
        </Pressable>

        <View style={styles.countContainer}>
          <AppText style={styles.countText}>
            {selectedImageIndex + 1} / {items.length}
          </AppText>
        </View>

        <FlatList
          ref={modalFlatListRef}
          data={items}
          horizontal
          pagingEnabled
          scrollEnabled={isScrollEnabled} // ⭐️ Zoom 상태에 따라 제어됨
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

        {/* 슬라이드 가능할 때만 인디케이터 표시 (선택사항) */}
        {isScrollEnabled && (
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
        )}
      </View>
    </Modal>
  );
};

export default FestivalDetailImageModal;
