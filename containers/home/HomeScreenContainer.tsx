import { ActivityIndicator, FlatList, View } from "react-native";
import { useFestivalInfiniteQuery } from "@/hooks/useFestivalInfiniteQuery";
import { useCallback, useRef } from "react";
import LoadingFooter from "@/components/footers/LoadingFooter";
import { AppText } from "@/components/text/AppText";
import FestivalCard from "@/components/card/FestivalCard";
import { styles } from "@/containers/home/HomeScreenContainer.styles";
import { useScrollToTop } from "@react-navigation/native";
import OnGoingFestival from "@/containers/home/OnGoingFestival";

const HomeScreenContainer = () => {
  const {
    data: festivalData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = useFestivalInfiniteQuery();

  const listRef = useRef<FlatList>(null);

  // 두번째 클릭시 맨 위로 스크롤
  useScrollToTop(listRef);

  const festivalList =
    festivalData?.pages.flatMap((page) => page.data.items.item) || [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <AppText style={styles.emptyText}>축제 정보가 없습니다.</AppText>
      </View>
    ),
    [],
  );

  if (isPending) {
    return (
      <View style={styles.pendingContainer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.pendingContainer}>
        <AppText>
          {error instanceof Error
            ? error.message
            : "축제 정보를 불러오는 데 실패했습니다."}
        </AppText>
      </View>
    );
  }

  return (
    <FlatList
      ref={listRef}
      data={festivalList}
      keyExtractor={(item, index) => item.contentid + index.toString()}
      renderItem={({ item }) => <FestivalCard festival={item} isColumn />}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginHorizontal: 16,
      }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      onRefresh={refetch}
      refreshing={isPending}
      removeClippedSubviews={false}
      maxToRenderPerBatch={10}
      ListHeaderComponent={<OnGoingFestival />}
      ListFooterComponent={() => (
        <LoadingFooter isFetchingNextPage={isFetchingNextPage} />
      )}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

export default HomeScreenContainer;
