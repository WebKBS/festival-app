import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 240, // 원하는 높이로 조정
    position: "relative",
  },
  webview: {
    width: "100%",
    height: 240,
    padding: 0,
    margin: 0,
  },

  findButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: Colors.blue,
    padding: 8,
    borderRadius: 5,
    elevation: 3, // 안드로이드 그림자
    shadowColor: "#000", // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  findButtonText: {
    color: "white",
    fontSize: 14,
  },
});
