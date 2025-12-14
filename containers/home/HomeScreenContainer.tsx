import { Text, View } from "react-native";
import { useFestivalInfiniteQuery } from "@/hooks/useFestivalInfiniteQuery";

const HomeScreenContainer = () => {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = useFestivalInfiniteQuery();

  const festivalData =
    data?.pages.flatMap((page) => page.data.items.item) || [];

  console.log("festivalData:", festivalData);

  return (
    <View>
      <Text>HomeScreenContainer</Text>
    </View>
  );
};

export default HomeScreenContainer;
