import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FestivalTypes } from "@/types/festival.types";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { format, parse } from "date-fns";
import { useRouter } from "expo-router";
import { telBrReplace } from "@/utils/replace/telBrReplace";
import { getEventStatus, getStatusColor } from "@/utils/status/eventProgress";
import { blurhash } from "@/constants/images/imageBlur";
import FavoriteButton from "@/features/buttons/FavoriteButton";

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  imageContainer: {
    position: "relative",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    overflow: "hidden",
    height: 200,
  },

  festivalImage: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },

  statusText: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: "Pretendard-SemiBold",
  },

  cardContent: {
    padding: 12,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  statusBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  title: {
    fontSize: 18,
    fontFamily: "Pretendard-Bold",
    color: "#333",
    marginBottom: 12,
    lineHeight: 24,
    flexWrap: "wrap",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 1,
    marginBottom: 8,
  },

  innerInfoRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  location: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 12,
    flexWrap: "wrap",
  },
  categoryBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: "#1976D2",
    fontWeight: "500",
  },
});
