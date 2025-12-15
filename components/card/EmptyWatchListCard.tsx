import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/components/card/EmptyWatchListCard.styles";

const EmptyWatchListCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="heart-outline" size={32} color="#d0d5dd" />
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>마음에 드는 축제를 저장해 보세요</Text>
        <Text style={styles.subtitle}>
          카드의 하트 버튼을 눌러 즐겨찾기에 추가할 수 있습니다.
        </Text>
      </View>
    </View>
  );
};

export default EmptyWatchListCard;
