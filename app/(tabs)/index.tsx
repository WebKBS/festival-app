import { StyleSheet, View } from "react-native";
import HomeScreenContainer from "@/containers/home/HomeScreenContainer";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { watchListTable } from "@/db/schema/watch-list.table";
import { db } from "@/db";

const HomeScreen = () => {
  const dbContext = useSQLiteContext();
  useDrizzleStudio(dbContext);

  const data = db.select().from(watchListTable).all();
  console.log("Watch List Sample Data:", data);

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
