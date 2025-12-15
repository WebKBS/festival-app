import { StyleSheet, View } from "react-native";
import HomeScreenContainer from "@/containers/home/HomeScreenContainer";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

const HomeScreen = () => {
  const dbContext = useSQLiteContext();
  useDrizzleStudio(dbContext);

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
