import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 120,
  },

  titleBox: {
    flex: 1,
    flexDirection: "column",
    gap: 6,
  },

  listItem: {
    paddingVertical: 0,
    marginBottom: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    // Android elevation
    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f2f2f2",
  },

  listTitle: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
  },
  listAddr: {
    color: "#666",
    fontSize: 13,
    marginTop: 2,
    fontFamily: "Pretendard-Regular",
    lineHeight: 18,
  },

  imageBox: {
    width: 96,
    height: 96,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },

  emptyCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
