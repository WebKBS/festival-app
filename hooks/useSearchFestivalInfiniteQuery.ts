import { useInfiniteQuery } from "@tanstack/react-query";
import { getFestivalSearch } from "@/service/festival/festival-search";

interface UseSearchFestivalInfiniteQueryParams {
  submittedKeyword: string;
  submittedLocation: string;
}

export const useSearchFestivalInfiniteQuery = ({
  submittedKeyword,
  submittedLocation,
}: UseSearchFestivalInfiniteQueryParams) => {
  return useInfiniteQuery({
    queryKey: ["festivalSearch", submittedKeyword, submittedLocation],
    queryFn: ({ pageParam }) =>
      getFestivalSearch({
        pageParam,
        keyword: submittedKeyword,
        areaCode: submittedLocation === "ALL" ? "" : submittedLocation,
        sigunguCode: "",
        arrange: "D", // 기본값: 생성일순
        size: 20,
      }),
    initialPageParam: 1,
    // enabled: submittedKeyword.trim().length > 0 || submittedLocation !== "ALL",
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = lastPage.data.pageNo;
      const totalCount = lastPage.data.totalCount;
      const pageSize = lastPage.data.numOfRows;
      const currentItems = lastPage.data.items?.item?.length || 0;

      // 지금까지 로드된 총 아이템 수 계산
      const loadedItemsCount = allPages.reduce((total, page) => {
        return total + (page.data.items?.item?.length || 0);
      }, 0);

      // 전체 데이터 로드 완료
      if (loadedItemsCount >= totalCount) {
        return undefined;
      }

      // 현재 페이지의 아이템 수가 요청한 size보다 적으면 마지막 페이지
      if (currentItems < pageSize && currentItems > 0) {
        return undefined;
      }

      // 아이템이 아예 없으면 중단
      if (currentItems === 0) {
        return undefined;
      }

      return currentPage + 1;
    },
  });
};
