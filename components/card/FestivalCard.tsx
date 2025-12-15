import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { FestivalTypes } from "@/types/festival.types";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { format, parse } from "date-fns";
import { useRouter } from "expo-router";
import { telBrReplace } from "@/utils/replace/telBrReplace";
import { getEventStatus, getStatusColor } from "@/utils/status/eventProgress";
import { blurhash } from "@/constants/images/imageBlur";
import FavoriteButton from "@/features/buttons/FavoriteButton";
import { styles } from "@/components/card/FestivalCard.styles";

export type CardItemType = Pick<
  FestivalTypes,
  | "contentid"
  | "title"
  | "firstimage"
  | "eventstartdate"
  | "eventenddate"
  | "addr1"
  | "addr2"
  | "tel"
>;

interface FestivalCardProps {
  festival: CardItemType;
  isColumn?: boolean; // 컬럼 형태로 표시할지 여부
}

const { width } = Dimensions.get("window");

const FestivalCard = ({ festival, isColumn }: FestivalCardProps) => {
  const NO_IMAGE_URI = require("@/assets/images/common/no-image.png");
  const router = useRouter();

  return (
    <TouchableOpacity
      key={festival.contentid}
      style={[
        styles.card,
        {
          width: isColumn
            ? width / 2 - 16 - 8 // 컬럼 형태일 때 카드 너비 조정 (화면 너비의 절반 - 좌우 마진 - 컬럼 간격)
            : "100%", // 컬럼 형태일 때 너비 조정
        },
      ]}
      onPress={() => {
        router.push(`/festival/${festival.contentid}`);
      }}
      activeOpacity={0.8} // 터치 시 opacity 효과 수치
    >
      {/* 축제 이미지와 좋아요 버튼 */}
      <View style={{ ...styles.imageContainer, height: 140 }}>
        <Image
          source={
            festival.firstimage ? { uri: festival.firstimage } : NO_IMAGE_URI
          }
          style={styles.festivalImage}
          contentFit={festival.firstimage ? "cover" : "contain"}
          placeholder={{ blurhash }}
        />
        <View style={styles.imageOverlay}>
          <FavoriteButton festival={festival} />
        </View>

        {/* 진행중 상태 표시 */}
        {festival.eventstartdate && festival.eventenddate && (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: getStatusColor(
                  festival.eventstartdate,
                  festival.eventenddate,
                ),
              },
            ]}
          >
            <Text style={styles.statusText}>
              {getEventStatus(festival.eventstartdate, festival.eventenddate)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <Text
          style={styles.title}
          numberOfLines={2}
          lineBreakStrategyIOS={"hangul-word"}
        >
          {festival.title}
        </Text>

        <View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.location} numberOfLines={1}>
              {festival.addr1} {festival.addr2}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <View style={styles.innerInfoRow}>
              {festival.eventstartdate ? (
                <Text style={styles.date}>
                  {format(
                    parse(festival.eventstartdate, "yyyyMMdd", new Date()),
                    "yyyy.MM.dd",
                  )}
                </Text>
              ) : (
                <Text style={styles.date}>날짜 미정</Text>
              )}
              <Text style={styles.date}>~</Text>
              {festival.eventenddate ? (
                <Text style={styles.date}>
                  {format(
                    parse(festival.eventenddate, "yyyyMMdd", new Date()),
                    "yyyy.MM.dd",
                  )}
                </Text>
              ) : (
                <Text style={styles.date}>날짜 미정</Text>
              )}
            </View>
          </View>
          {festival.tel && (
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={16} color="#666" />
              <Text
                style={styles.phone}
                numberOfLines={2}
                lineBreakStrategyIOS={"hangul-word"}
              >
                {telBrReplace(festival.tel)}
              </Text>
            </View>
          )}
        </View>

        {/*<View style={styles.categoryContainer}>*/}
        {/*  <View style={styles.categoryBadge}>*/}
        {/*    <Text style={styles.categoryText}>{festival.cat3}</Text>*/}
        {/*  </View>*/}
        {/*  <View style={styles.categoryBadge}>*/}
        {/*    <Text style={styles.categoryText}>{festival.festivaltype}</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </View>
    </TouchableOpacity>
  );
};

export default FestivalCard;
