import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { styles } from "@/components/headers/HomeHeader.styles";
import { AppText } from "@/components/text/AppText";

const HomeHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
      }}
    >
      <View style={styles.header}>
        <AppText style={styles.title}>축제정보</AppText>
        <View style={styles.buttonBox}>
          <Link href={"/search"}>
            <Feather name="search" size={24} color="black" />
          </Link>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
