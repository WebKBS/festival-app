import { StyleSheet, View } from "react-native";
import HomeScreenContainer from "@/containers/home/HomeScreenContainer";
import { Link } from "expo-router";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Link href={"/festival/123"}>Go to Festival 123</Link>
      <HomeScreenContainer />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
