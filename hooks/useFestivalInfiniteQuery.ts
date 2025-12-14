import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFestivals } from "@/service/festival/festival"; // 타입 정의에 따라 수정

export const useFestivalInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["festivals"],
    queryFn: ({ pageParam = 1 }) => fetchFestivals({ pageParam, size: 20 }),
    initialPageParam: 1,
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
