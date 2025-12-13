import { Platform, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { styles } from "@/components/headers/FestivalDetailHeader.styles";

const FestivalDetailHeader = () => {
  const inset = useSafeAreaInsets();

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: inset.top,
      }}
    >
      <Pressable onPress={handleBackPress}>
        <Entypo
          name="chevron-left"
          size={24}
          color="#fff"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            borderRadius: 8,
            padding: 8,
            backgroundColor:
              Platform.OS === "android" ? "rgba(0, 0, 0, 0.1)" : "transparent",
          }}
        />
      </Pressable>
    </View>
  );
};

export default FestivalDetailHeader;
