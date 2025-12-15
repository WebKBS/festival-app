import { FlatList, StyleSheet, View } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import FestivalCard from "@/components/card/FestivalCard";
import { db } from "@/db";
import { watchListTable } from "@/db/schema/watch-list.table";
import EmptyWatchListCard from "@/components/card/EmptyWatchListCard";

const WatchListScreen = () => {
  const { data } = useLiveQuery(db.select().from(watchListTable));
  const isEmpty = (data?.length || 0) === 0;

  return (
    <View style={[styles.container]}>
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.contentId.toString()}
        renderItem={({ item }) => (
          <FestivalCard
            festival={{
              contentid: item.contentId.toString(),
              title: item.title,
              firstimage: item.image || "",
              eventstartdate: item.eventStartDate || "",
              eventenddate: item.eventEndDate || "",
              addr1: item.addr1 || "",
              addr2: item.addr2 || "",
              tel: item.tel || "",
            }}
          />
        )}
        ListEmptyComponent={<EmptyWatchListCard />}
        contentContainerStyle={[
          styles.listContent,
          isEmpty && styles.emptyContent,
        ]}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        windowSize={5}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log("End reached");
        }}
        refreshing={false}
        onRefresh={() => {
          console.log("Refreshing...");
        }}
      />
    </View>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 16,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
