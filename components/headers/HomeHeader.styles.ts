import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontFamily: "Pretendard-Bold",
  },

  buttonBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
