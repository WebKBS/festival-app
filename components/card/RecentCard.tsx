import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/text/AppText";

interface RecentCardProps {
  recent: string[];
  onPress: (term: string) => void;
  onDelete: (term: string) => void;
}
const RecentCard = ({ recent, onPress, onDelete }: RecentCardProps) => {
  return (
    <View style={styles.recentSearchContainer}>
      <AppText style={styles.sectionTitle}>최근 검색어</AppText>
      {recent.length === 0 ? (
        <AppText style={styles.emptyText}>최근 검색어가 없습니다.</AppText>
      ) : (
        recent.slice(0, 8).map((term) => (
          <View key={term} style={styles.recentRow}>
            <Pressable onPress={() => onPress(term)} style={{ flex: 1 }}>
              <AppText style={styles.recentText}>{term}</AppText>
            </Pressable>
            <Pressable onPress={() => onDelete(term)}>
              <AppText style={styles.deleteText}>삭제</AppText>
            </Pressable>
          </View>
        ))
      )}
    </View>
  );
};

export default RecentCard;

const styles = StyleSheet.create({
  recentSearchContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    color: "#666",
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  recentText: {
    fontSize: 16,
  },
  deleteText: {
    color: "#ff3b30",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
