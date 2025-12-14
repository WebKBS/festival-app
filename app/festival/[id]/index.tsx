import { Text, View } from "react-native";
import { usePathname } from "expo-router";

const FestivalDetailScreen = () => {
  const pathname = usePathname();
  const contentId = pathname.split("/").pop(); // URL에서 축제 ID 추출

  return (
    <View>
      <Text>FestivalDetailScreen</Text>
    </View>
  );
};

export default FestivalDetailScreen;
