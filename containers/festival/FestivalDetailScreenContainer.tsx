import PhoneComponent from "@/components/buttons/PhoneComponent";
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
import { AppText } from "@/components/text/AppText";
import { styles } from "@/containers/festival/FestivalDetailScreenContainer.styles";

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
          <AppText style={styles.errorTitle}>😔 오류가 발생했습니다</AppText>
          <AppText style={styles.errorText}>다시 시도해주세요.</AppText>
        </View>
      </View>
    );
  }

  if (!data || !data.data?.detail?.[0]) {
    return (
      <View style={styles.centered}>
        <View style={styles.errorContainer}>
          <AppText style={styles.errorTitle}>📭 정보가 없습니다</AppText>
          <AppText style={styles.errorText}>
            상세 정보가 존재하지 않습니다.
          </AppText>
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
              <AppText style={styles.title}>{detailData.title}</AppText>
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
                  <AppText style={styles.statusText}>
                    {getEventStatus(
                      introData.eventstartdate,
                      introData.eventenddate,
                    )}
                  </AppText>
                </View>
              )}
            </View>

            {/* 간단한 정보 카드들 */}
            <View style={styles.infoCards}>
              {introData.playtime && (
                <View style={styles.infoCard}>
                  <AppText style={styles.infoCardIcon}>🕐</AppText>
                  <AppText style={styles.infoCardLabel}>시작 시간</AppText>
                  <AppText style={styles.infoCardValue}>
                    {introData.playtime}
                  </AppText>
                </View>
              )}

              {introData.sponsor2 && (
                <View style={styles.infoCard}>
                  <AppText style={styles.infoCardIcon}>🏢</AppText>
                  <AppText style={styles.infoCardLabel}>주관사</AppText>
                  <AppText style={styles.infoCardValue}>
                    {introData.sponsor2}
                  </AppText>
                </View>
              )}
            </View>
          </View>

          {/* 개요 섹션 */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AppText style={styles.cardIcon}>📝</AppText>
              <AppText style={styles.cardTitle} weight={"bold"}>
                축제 개요
              </AppText>
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
                <AppText style={styles.moreButtonText}>
                  {isMore ? "접기 ▲" : "더 보기 ▼"}
                </AppText>
              </Pressable>
            </View>
          </View>

          {/* 축제 기간 섹션 */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AppText style={styles.cardIcon}>📅</AppText>
              <AppText style={styles.cardTitle} weight={"bold"}>
                축제 기간
              </AppText>
            </View>
            <View style={styles.overviewContainer}>
              {introData.eventstartdate && introData.eventenddate ? (
                <AppText style={styles.overviewText}>
                  {format(
                    parse(introData.eventstartdate, "yyyyMMdd", new Date()),
                    "yyyy.MM.dd",
                  )}
                  {" ~ "}
                  {format(
                    parse(introData.eventenddate, "yyyyMMdd", new Date()),
                    "yyyy.MM.dd",
                  )}
                </AppText>
              ) : (
                <AppText style={styles.overviewText}>
                  기간 정보가 없습니다.
                </AppText>
              )}
            </View>
          </View>

          {/* 위치 정보 섹션 */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AppText style={styles.cardIcon}>📍</AppText>
              <AppText style={styles.cardTitle} weight={"bold"}>
                위치 정보
              </AppText>
              {detailData.addr1 || detailData.addr2 ? (
                <CopyAddressButton
                  address={detailData.addr1}
                  addressDetail={detailData.addr2}
                />
              ) : (
                <AppText
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  위치 정보가 없습니다.
                </AppText>
              )}
            </View>
            <View style={styles.addressContainer}>
              <AppText style={styles.addressText}>
                {detailData.addr1} {detailData.addr2}
              </AppText>
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
                <AppText style={styles.cardIcon}>📞</AppText>
                <AppText
                  weight={"bold"}
                  style={styles.cardTitle}
                  lineBreakStrategyIOS={"hangul-word"}
                >
                  {detailData.telname || "연락처"}
                </AppText>
              </View>
              <PhoneComponent detailData={detailData} />
              {introData.sponsor2tel ? (
                <View style={styles.subContact}>
                  <AppText style={styles.subContactLabel}>
                    주관사 연락처
                  </AppText>
                  <AppText style={styles.subContactValue}>
                    {introData.sponsor2tel}
                  </AppText>
                </View>
              ) : null}
            </View>
          )}

          {/* 액션 버튼들 */}
          <View style={styles.actionSection}>
            {detailData.homepage && (
              <Pressable onPress={openHomepage} style={styles.primaryButton}>
                <AppText style={styles.primaryButtonIcon}>🌐</AppText>
                <AppText style={styles.primaryButtonText}>
                  홈페이지 바로가기
                </AppText>
              </Pressable>
            )}

            <Pressable onPress={openMap} style={styles.secondaryButton}>
              <AppText style={styles.secondaryButtonIcon}>🗺️</AppText>
              <AppText style={styles.secondaryButtonText}>
                지도에서 보기
              </AppText>
            </Pressable>
          </View>

          {/* 주의사항 */}
          <View style={styles.warningCard}>
            <AppText style={styles.warningIcon}>⚠️</AppText>
            <AppText style={styles.warningText}>
              본 축제는 공공기관에서 제공하는 정보로, 변동이 있을 수 있습니다.
              정확한 정보는 해당 기관의 공식 홈페이지 및 전화 문의를 통해
              확인하시기 바랍니다.
            </AppText>
          </View>

          {/* 디버그 정보 (개발용) */}
          {__DEV__ && (
            <View style={styles.debugCard}>
              <AppText style={styles.debugTitle}>🔧 디버그 정보</AppText>
              <AppText style={styles.debugText}>
                축제 ID: {detailData.contentid}
              </AppText>
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
