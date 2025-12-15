import PhoneComponent from "@/components/buttons/PhoneComponent";
import { Colors } from "@/constants/colors";
import CopyAddressButton from "@/features/buttons/CopyAddressButton";
import LikeShareButton from "@/features/buttons/LikeShareButton";
import FestivalDetailCarousel, {
  ITEM_HEIGHT,
} from "@/features/carousel/FestivalDetailCarousel";
import KakaoMap from "@/features/kakao/KaKaoMap";
import { getFestivalDetail } from "@/service/festival/festival-detail";
import { getEventStatus, getStatusColor } from "@/utils/status/eventProgress";
import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import RenderHTML from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FestivalDetailScreenContainerProps {
  contentId: string;
}

const FestivalDetailScreenContainer = ({
  contentId,
}: FestivalDetailScreenContainerProps) => {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("screen");

  // parallax effect scroll value and handler
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const imageAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
            [-ITEM_HEIGHT / 2, 0, ITEM_HEIGHT * 0.75],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
            [2, 1, 1.15],
            Extrapolation.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        scrollY.value,
        [0, 300],
        [1, 0.5],
        Extrapolation.CLAMP,
      ),
    };
  });

  const [isMore, setIsMore] = useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: ["festivalDetail", contentId],
    queryFn: () => getFestivalDetail(contentId),
  });

  if (isPending) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="small" color="#6366f1" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>😔 오류가 발생했습니다</Text>
          <Text style={styles.errorText}>다시 시도해주세요.</Text>
        </View>
      </View>
    );
  }

  if (!data || !data.data?.detail?.[0]) {
    return (
      <View style={styles.centered}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>📭 정보가 없습니다</Text>
          <Text style={styles.errorText}>상세 정보가 존재하지 않습니다.</Text>
        </View>
      </View>
    );
  }

  const detailData = data.data.detail[0];
  const introData = data.data.intro[0];

  const openMap = async () => {
    const url = `https://maps.google.com/?q=${detailData.mapy},${detailData.mapx}`;
    await Linking.openURL(url);
  };

  const openHomepage = async () => {
    if (!detailData.homepage) return;

    const regex = /href="([^"]+)"/;

    const match = detailData.homepage.match(regex);
    const url = match ? match[1] : null;
    if (url) await Linking.openURL(url);
  };

  const handleMoreToggle = () => {
    setIsMore(!isMore);
  };

  return (
    <>
      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        <Animated.View style={[{ height: ITEM_HEIGHT }, imageAnimationStyle]}>
          <FestivalDetailCarousel contentId={contentId} />
        </Animated.View>
        <View
          style={{ ...styles.container, paddingBottom: insets.bottom + 20 }}
        >
          {/* 헤더 섹션 */}
          <View style={styles.headerSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{detailData.title}</Text>
              {introData.eventstartdate && introData.eventenddate && (
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: getStatusColor(
                        introData.eventstartdate,
                        introData.eventenddate,
                      ),
                    },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {getEventStatus(
                      introData.eventstartdate,
                      introData.eventenddate,
                    )}
                  </Text>
                </View>
              )}
            </View>

            {/* 간단한 정보 카드들 */}
            <View style={styles.infoCards}>
              {introData.playtime && (
                <View style={styles.infoCard}>
                  <Text style={styles.infoCardIcon}>🕐</Text>
                  <Text style={styles.infoCardLabel}>시작 시간</Text>
                  <Text style={styles.infoCardValue}>{introData.playtime}</Text>
                </View>
              )}

              {introData.sponsor2 && (
                <View style={styles.infoCard}>
                  <Text style={styles.infoCardIcon}>🏢</Text>
                  <Text style={styles.infoCardLabel}>주관사</Text>
                  <Text style={styles.infoCardValue}>{introData.sponsor2}</Text>
                </View>
              )}
            </View>
          </View>

          {/* 개요 섹션 */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>📝</Text>
              <Text style={styles.cardTitle}>축제 개요</Text>
            </View>
            <View style={styles.overviewContainer}>
              <View
                style={[
                  styles.overviewContent,
                  { maxHeight: isMore ? undefined : 100 },
                ]}
              >
                <RenderHTML
                  baseStyle={styles.overviewText}
                  contentWidth={width - 80}
                  defaultTextProps={{ numberOfLines: isMore ? undefined : 3 }}
                  source={{
                    html: detailData.overview || "개요 정보가 없습니다.",
                  }}
                />
              </View>
              <Pressable style={styles.moreButton} onPress={handleMoreToggle}>
                <Text style={styles.moreButtonText}>
                  {isMore ? "접기 ▲" : "더 보기 ▼"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* 축제 기간 섹션 */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>📅</Text>
              <Text style={styles.cardTitle}>축제 기간</Text>
            </View>
            <View style={styles.overviewContainer}>
              {introData.eventstartdate && introData.eventenddate ? (
                <Text style={styles.overviewText}>
                  {format(
                    parse(introData.eventstartdate, "yyyyMMdd", new Date()),
                    "yyyy.MM.dd",
                  )}
                  {" ~ "}
                  {format(
                    parse(introData.eventenddate, "yyyyMMdd", new Date()),
                    "yyyy.MM.dd",
                  )}
                </Text>
              ) : (
                <Text style={styles.overviewText}>기간 정보가 없습니다.</Text>
              )}
            </View>
          </View>

          {/* 위치 정보 섹션 */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>📍</Text>
              <Text style={styles.cardTitle}>위치 정보</Text>
              {detailData.addr1 || detailData.addr2 ? (
                <CopyAddressButton
                  address={detailData.addr1}
                  addressDetail={detailData.addr2}
                />
              ) : (
                <Text
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  위치 정보가 없습니다.
                </Text>
              )}
            </View>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
                {detailData.addr1} {detailData.addr2}
              </Text>
            </View>

            {detailData.mapx && detailData.mapy && (
              <View style={styles.mapContainer}>
                <KakaoMap
                  latitude={+detailData.mapy}
                  longitude={+detailData.mapx}
                  mlevel={detailData.mlevel ? +detailData.mlevel : 6}
                />
              </View>
            )}
          </View>

          {/* 연락처 정보 섹션 */}
          {detailData.tel && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>📞</Text>
                <Text
                  style={styles.cardTitle}
                  lineBreakStrategyIOS={"hangul-word"}
                >
                  {detailData.telname || "연락처"}
                </Text>
              </View>
              <PhoneComponent detailData={detailData} />
              {introData.sponsor2tel ? (
                <View style={styles.subContact}>
                  <Text style={styles.subContactLabel}>주관사 연락처</Text>
                  <Text style={styles.subContactValue}>
                    {introData.sponsor2tel}
                  </Text>
                </View>
              ) : null}
            </View>
          )}

          {/* 액션 버튼들 */}
          <View style={styles.actionSection}>
            {detailData.homepage && (
              <Pressable onPress={openHomepage} style={styles.primaryButton}>
                <Text style={styles.primaryButtonIcon}>🌐</Text>
                <Text style={styles.primaryButtonText}>홈페이지 바로가기</Text>
              </Pressable>
            )}

            <Pressable onPress={openMap} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonIcon}>🗺️</Text>
              <Text style={styles.secondaryButtonText}>지도에서 보기</Text>
            </Pressable>
          </View>

          {/* 주의사항 */}
          <View style={styles.warningCard}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningText}>
              본 축제는 공공기관에서 제공하는 정보로, 변동이 있을 수 있습니다.
              정확한 정보는 해당 기관의 공식 홈페이지 및 전화 문의를 통해
              확인하시기 바랍니다.
            </Text>
          </View>

          {/* 디버그 정보 (개발용) */}
          {__DEV__ && (
            <View style={styles.debugCard}>
              <Text style={styles.debugTitle}>🔧 디버그 정보</Text>
              <Text style={styles.debugText}>
                축제 ID: {detailData.contentid}
              </Text>
            </View>
          )}
        </View>
      </Animated.ScrollView>
      {/* 공유 및 좋아요 버튼  */}
      {/* 에러이거나 데이터가 없으면 버튼 숨김 */}
      {isError || !data || !data.data?.detail?.[0] ? null : (
        <LikeShareButton
          contentId={contentId}
          festival={data.data.detail[0]}
          eventStartDate={introData.eventstartdate}
          eventEndDate={introData.eventenddate}
        />
      )}
    </>
  );
};

export default FestivalDetailScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  centered: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },

  errorContainer: {
    alignItems: "center",
    padding: 20,
  },

  errorTitle: {
    fontSize: 20,
    fontFamily: "Pretendard-Bold",
    color: "#374151",
    marginBottom: 8,
  },

  errorText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },

  headerSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  titleContainer: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontFamily: "Pretendard-Bold",
    color: "#111827",
    marginBottom: 12,
    lineHeight: 34,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  statusText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Pretendard-SemiBold",
  },

  infoCards: {
    flexDirection: "row",
    gap: 12,
  },

  infoCard: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  infoCardIcon: {
    fontSize: 20,
    marginBottom: 4,
  },

  infoCardLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 4,
  },

  infoCardValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  cardHeaderTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  cardTitle: {
    fontSize: 18,
    fontFamily: "Pretendard-Bold",
    color: "#111827",
  },

  overviewContainer: {
    position: "relative",
  },

  overviewContent: {
    overflow: "hidden",
  },

  overviewText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
  },

  moreButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  moreButtonText: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "600",
  },

  addressContainer: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  addressText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },

  mapContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },

  subContact: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  subContactLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },

  subContactValue: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },

  actionSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },

  primaryButton: {
    backgroundColor: Colors.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },

  primaryButtonIcon: {
    fontSize: 16,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    gap: 8,
  },

  secondaryButtonIcon: {
    fontSize: 16,
  },

  secondaryButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },

  warningCard: {
    backgroundColor: "#fef3cd",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },

  warningIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },

  warningText: {
    flex: 1,
    fontSize: 14,
    color: "#92400e",
    lineHeight: 20,
  },

  debugCard: {
    backgroundColor: "#f3f4f6",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },

  debugTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 8,
  },

  debugText: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
