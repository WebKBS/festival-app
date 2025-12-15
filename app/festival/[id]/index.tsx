import { ScrollView, StyleSheet, Text, View } from "react-native";
import FestivalDetailScreenContainer from "@/containers/festival/FestivalDetailScreenContainer";
import { usePathname } from "expo-router";
import FestivalDetailHeader from "@/components/headers/FestivalDetailHeader";

const FestivalDetailScreen = () => {
  const pathname = usePathname();
  const contentId = pathname.split("/").pop(); // URL에서 축제 ID 추출

  if (!contentId) {
    return (
      <View style={styles.container}>
        <FestivalDetailHeader />
        <ScrollView style={styles.scrollView}>
          <View style={{ padding: 20 }}>
            <Text>상세 내용이 없습니다.</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FestivalDetailHeader />
      <FestivalDetailScreenContainer contentId={contentId} />
    </View>
  );
};

export default FestivalDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
});
