import { Pressable, StyleSheet, Text, View } from "react-native";

interface RecentCardProps {
  recent: string[];
  onPress: (term: string) => void;
  onDelete: (term: string) => void;
}
const RecentCard = ({ recent, onPress, onDelete }: RecentCardProps) => {
  return (
    <View style={styles.recentSearchContainer}>
      <Text style={styles.sectionTitle}>최근 검색어</Text>
      {recent.length === 0 ? (
        <Text style={styles.emptyText}>최근 검색어가 없습니다.</Text>
      ) : (
        recent.slice(0, 8).map((term) => (
          <View key={term} style={styles.recentRow}>
            <Pressable onPress={() => onPress(term)} style={{ flex: 1 }}>
              <Text style={styles.recentText}>{term}</Text>
            </Pressable>
            <Pressable onPress={() => onDelete(term)}>
              <Text style={styles.deleteText}>삭제</Text>
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
