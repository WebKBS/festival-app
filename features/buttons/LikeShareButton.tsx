import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DetailInfo } from "@/types/detail.types";
import ActiveFavoriteButton from "@/features/buttons/ActiveFavoriteButton";

interface LikeShareButtonProps {
  contentId: string; // 선택적으로 contentId를 받을 수 있도록 변경
  festival: DetailInfo;
  eventStartDate: string | null; // 선택적으로 eventStartDate를 받을 수 있도록 변경
  eventEndDate: string | null; // 선택적으로 eventEndDate를 받을 수 있도록 변경
}

const LikeShareButton = ({
  contentId,
  festival,
  eventEndDate,
  eventStartDate,
}: LikeShareButtonProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          bottom: insets.bottom + 20,
          right: insets.right + 20,
        },
      ]}
    >
      {/*/!* 공유 버튼 *!/*/}
      {/*<ShareButton title={festival.title} message={festival.overview} />*/}

      {/*/!* 구분선 *!/*/}
      {/*<View style={styles.divider} />*/}

      {/* 좋아요 버튼 */}
      <ActiveFavoriteButton
        contentId={contentId}
        festival={festival}
        eventEndDate={eventEndDate ? eventEndDate : ""}
        eventStartDate={eventStartDate ? eventStartDate : ""}
      />
    </View>
  );
};

export default LikeShareButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)", // iOS에서 블러 효과
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },

  divider: {
    width: 20,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 6,
  },
});
