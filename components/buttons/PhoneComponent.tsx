import React from "react";
import { Linking, Pressable, StyleSheet } from "react-native";
import {
  extractFirstPhoneNumber,
  telBrReplace,
} from "@/utils/replace/telBrReplace";
import { DetailInfo } from "@/types/detail.types";
import { AppText } from "@/components/text/AppText";

// 사용 예시 컴포넌트 (단순 버전)
const PhoneComponent = ({ detailData }: { detailData: DetailInfo }) => {
  if (!detailData.tel) {
    return null;
  }
  const firstPhoneNumber = extractFirstPhoneNumber(detailData.tel);

  const handlePhonePress = () => {
    if (firstPhoneNumber) {
      Linking.openURL(`tel:${firstPhoneNumber}`);
    }
  };

  return (
    <Pressable onPress={handlePhonePress}>
      <AppText style={styles.tel}>{telBrReplace(detailData.tel)}</AppText>
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
