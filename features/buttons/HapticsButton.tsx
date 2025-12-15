import { Pressable, PressableProps } from "react-native";
import * as Haptics from "expo-haptics";
import { ReactNode } from "react";

interface HapticsButtonProps extends PressableProps {
  children?: ReactNode; // 버튼 안에 들어갈 요소
  hapticStyle?: Haptics.ImpactFeedbackStyle; // 햅틱 강도 옵션
}

const HapticsButton = ({
  children,
  hapticStyle = Haptics.ImpactFeedbackStyle.Light,
  onPress,
  ...rest
}: HapticsButtonProps) => {
  return (
    <Pressable
      onPress={async (e) => {
        // 기본 햅틱 효과
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // 외부에서 전달된 onPress 실행
        if (onPress) {
          onPress(e);
        }
      }}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

export default HapticsButton;
