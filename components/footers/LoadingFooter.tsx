import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

interface LoadingFooterProps {
  isFetchingNextPage: boolean;
}

const LoadingFooter = ({ isFetchingNextPage }: LoadingFooterProps) => {
  if (!isFetchingNextPage) return null;

  return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color="#007AFF" />
    </View>
  );
};

export default LoadingFooter;

const styles = StyleSheet.create({
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
    width: "100%", // 그리드에서도 전체 너비 사용
  },
});
