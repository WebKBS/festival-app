import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const styles = StyleSheet.create({
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
