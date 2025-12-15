import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { fetchFestivals } from "@/service/festival/festival";
import HorizontalImageScroll from "@/features/scroll/HorizontalImageScroll";
import OngoingSquareSlider from "@/features/slider/OngoingSquareSlider";

const OnGoingFestival = () => {
  const eventStartDate = format(new Date(), "yyyyMMdd");
  const eventEndDate = format(new Date(), "yyyyMMdd");

  const { data } = useQuery({
    queryKey: ["ongoingFestivals"],
    queryFn: () => fetchFestivals({ size: 10, eventStartDate, eventEndDate }),
  });

  const ongoingFestivals = data?.data.items?.item || [];

  return (
    <>
      <View style={styles.container}>
        <OngoingSquareSlider data={ongoingFestivals} />
        <View style={styles.titleCard}>
          <Text style={styles.title}>🎉 진행중인 축제</Text>
        </View>
        <HorizontalImageScroll data={ongoingFestivals} />
      </View>
    </>
  );
};

export default OnGoingFestival;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  titleCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
