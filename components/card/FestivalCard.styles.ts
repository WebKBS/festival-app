import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
