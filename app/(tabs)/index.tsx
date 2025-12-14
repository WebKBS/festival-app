import { StyleSheet, View } from "react-native";
import HomeScreenContainer from "@/containers/home/HomeScreenContainer";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
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
