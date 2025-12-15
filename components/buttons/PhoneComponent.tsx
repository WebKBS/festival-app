import React from "react";
import { Linking, Pressable, StyleSheet, Text } from "react-native";
import {
  extractFirstPhoneNumber,
  telBrReplace,
} from "@/utils/replace/telBrReplace";
import { DetailInfo } from "@/types/detail.types";

// 사용 예시 컴포넌트 (단순 버전)
const PhoneComponent = ({ detailData }: { detailData: DetailInfo }) => {
  const firstPhoneNumber = extractFirstPhoneNumber(detailData.tel);

  const handlePhonePress = () => {
    if (firstPhoneNumber) {
      Linking.openURL(`tel:${firstPhoneNumber}`);
    }
  };

  return (
    <Pressable onPress={handlePhonePress}>
      <Text style={styles.tel}>{telBrReplace(detailData.tel)}</Text>
    </Pressable>
  );
};

export default PhoneComponent;

const styles = StyleSheet.create({
  tel: {
    color: "#007AFF", // iOS 스타일링
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
