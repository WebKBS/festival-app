import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { styles } from "@/components/headers/HomeHeader.styles";

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
        <Text style={styles.title}>축제정보</Text>
        <View style={styles.buttonBox}>
          <Link href={"/"}>
            <Feather name="search" size={24} color="black" />
          </Link>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
