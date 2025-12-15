import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchHeader from "@/components/headers/SearchHeader";
import RecentCard from "@/components/card/RecentCard";
import LocationList from "@/components/card/LocationList";
import { Image } from "expo-image";
import LoadingFooter from "@/components/footers/LoadingFooter";
import { Colors } from "@/constants/colors";
import { useSearchFestivalInfiniteQuery } from "@/hooks/useSearchFestivalInfiniteQuery";
import { styles } from "@/containers/search/SearchScreenContainer.styles";
import { AppText } from "@/components/text/AppText";

const STORAGE_KEY = "RECENT_SEARCHES";
const MAX_RECENT = 10;

const SearchScreenContainer = () => {
  const insets = useSafeAreaInsets();

  const NO_IMAGE_URI = require("@/assets/images/common/no-image.png");

  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  // 제출된 검색 상태 (확인 버튼 누른 후에만 변경)
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState<string | "ALL">(
    "ALL",
  );

  const [location, setLocation] = useState<string | "ALL">("ALL");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    isFetching,
  } = useSearchFestivalInfiniteQuery({
    submittedKeyword,
    submittedLocation,
  });

  const festivalData =
    data?.pages?.flatMap((page) => page?.data?.items?.item || []) || [];

  // 초기 로드: 최근 검색어 불러오기
  useEffect(() => {
    const loadRecent = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setRecent(parsed);
        }
      } catch (e) {
        console.warn("Failed to load recent searches", e);
      }
    };
    loadRecent();
  }, []);

  // 최근 검색어 저장 함수
  const saveRecent = useCallback(
    async (term: string) => {
      const t = term.trim();
      if (!t) return;
      // 앞에 추가하고 중복 제거
      const next = [t, ...recent.filter((x) => x !== t)].slice(0, MAX_RECENT);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setRecent(next);
      } catch (e) {
        console.warn("Failed to save recent searches", e);
      }
    },
    [recent],
  );

  // 뒤로가기 버튼 핸들러
  const handleBackPress = () => {
    navigation.goBack();
  };

  // 검색어 제출 핸들러
  const handleSubmit = useCallback(async () => {
    const t = keyword.trim();
    // 저장하고 제출 상태 반영
    await saveRecent(t);
    setSubmittedKeyword(t);
    setSubmittedLocation(location);
    Keyboard.dismiss();
    // submittedKeyword 변경으로 쿼리가 실행되지만, 안전하게 수동 refetch 호출
    await refetch();
  }, [keyword, location, saveRecent, refetch]);

  // 최근 검색어 선택 핸들러
  const handlePressRecent = useCallback(
    async (term: string) => {
      setKeyword(term);
      const t = term.trim();
      if (!t) return;
      await saveRecent(t);
      setSubmittedKeyword(t);
      setSubmittedLocation(location);
      Keyboard.dismiss();
      await refetch();
    },
    [location, saveRecent, refetch],
  );

  // 최근 검색어 삭제 핸들러
  const handleDeleteRecent = useCallback(
    async (term: string) => {
      const next = recent.filter((x) => x !== term);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setRecent(next);
      } catch (e) {
        console.warn("Failed to delete recent search", e);
      }
    },
    [recent],
  );

  // 지역 선택 핸들러
  const handleLocationPress = useCallback(
    async (region: string) => {
      // 지역을 누르면, 현재 입력 중인 키워드로만 검색 실행 (비어있으면 키워드 없이 검색)
      const typed = keyword.trim();

      setLocation(region);
      setSubmittedKeyword(typed); // 비어있을 경우 공백 키워드로 설정하여 기존 키워드가 남지 않도록 함
      setSubmittedLocation(region);
      Keyboard.dismiss();
      await refetch();
    },
    [keyword, refetch],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: "#fff",
        }}
      >
        <SearchHeader
          onBackPress={handleBackPress}
          setIsFocused={setIsFocused}
          value={keyword}
          onChangeText={setKeyword}
          onSubmit={handleSubmit}
        />

        <View style={{ flex: 1 }}>
          {isFocused ? (
            // input focus시 최근 검색어 목록 표시
            <RecentCard
              recent={recent}
              onPress={handlePressRecent}
              onDelete={handleDeleteRecent}
            />
          ) : // 안내 컨텐츠
          null}

          {/* 지역 리스트 */}
          <LocationList location={location} onPress={handleLocationPress} />

          {/* 검색 결과 리스트: 지역 선택 섹션 다음에 위치 */}
          <View style={{ flex: 1 }}>
            <FlatList
              data={festivalData}
              keyExtractor={(item) =>
                item.contentid
                  ? item.contentid.toString()
                  : Math.random().toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem} activeOpacity={0.8}>
                  <Link href={`/festival/${item.contentid}`}>
                    <View style={styles.card}>
                      <View style={styles.imageBox}>
                        <Image
                          source={{
                            uri:
                              item.firstimage2 ||
                              item.firstimage ||
                              NO_IMAGE_URI,
                          }}
                          style={{ width: "100%", height: "100%" }}
                          contentFit="cover"
                          transition={300}
                        />
                      </View>
                      <View style={styles.titleBox}>
                        <AppText style={styles.listTitle} numberOfLines={2}>
                          {item.title}
                        </AppText>
                        <AppText
                          style={styles.listAddr}
                          numberOfLines={2}
                          lineBreakStrategyIOS={"hangul-word"}
                        >
                          {item.addr1} {item.addr2}
                        </AppText>
                      </View>
                    </View>
                  </Link>
                </TouchableOpacity>
              )}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                paddingBottom: 60,
                flexGrow: 1,
              }}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              ListFooterComponent={() => (
                <LoadingFooter isFetchingNextPage={isFetchingNextPage} />
              )}
              ListEmptyComponent={() =>
                isFetching || isLoading ? (
                  <View style={styles.emptyCenter}>
                    <ActivityIndicator size="small" color={Colors.blue} />
                  </View>
                ) : (
                  <View>
                    <AppText>검색 결과가 없습니다.</AppText>
                  </View>
                )
              }
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreenContainer;
