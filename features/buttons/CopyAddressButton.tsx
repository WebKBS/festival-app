import { Colors } from "@/constants/colors";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import { AppText } from "@/components/text/AppText";

interface CopyAddressButtonProps {
  address: string | null;
  addressDetail: string | null;
}

const CopyAddressButton = ({
  address,
  addressDetail,
}: CopyAddressButtonProps) => {
  return (
    <Pressable
      style={styles.copyButton}
      onPress={() => {
        const add = `${address} ${addressDetail}`;
        Clipboard.setStringAsync(add).then(() => {
          Alert.alert(
            "주소 복사",
            `${address} ${addressDetail}이(가) 클립보드에 복사되었습니다.`,
            [{ text: "확인" }],
          );
        });
      }}
    >
      <AppText style={styles.copyButtonText}>주소복사</AppText>
    </Pressable>
  );
};

export default CopyAddressButton;

const styles = StyleSheet.create({
  copyButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: Colors.blue,
    marginLeft: "auto",
  },

  copyButtonText: {
    color: Colors.white,
    fontSize: 12,
  },
});
