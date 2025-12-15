import { View } from "react-native";
import { AppText } from "@/components/text/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "@/components/headers/WatchListHeader.styles";

const WatchListHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
      }}
    >
      <View style={styles.header}>
        <AppText style={styles.title}>관심목록</AppText>
      </View>
    </View>
  );
};

export default WatchListHeader;
