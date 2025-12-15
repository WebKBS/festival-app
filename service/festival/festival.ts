import { apiUrl, headerKey, headerValue } from "@/constants/config";
import { FestivalResponse } from "@/types/festival.types";

export const fetchFestivals = async ({
  pageParam = 1,
  size = 20,
  eventStartDate = undefined,
  eventEndDate = undefined,
}: {
  pageParam?: number;
  size?: number;
  eventStartDate?: string;
  eventEndDate?: string;
}): Promise<FestivalResponse> => {
  try {
    const res = await fetch(
      `${apiUrl}/api/festival?page=${pageParam}&size=${size}${eventStartDate ? `&eventStartDate=${eventStartDate}` : ""}${eventEndDate ? `&eventEndDate=${eventEndDate}` : ""}`,
      {
        method: "GET",
        headers: {
          [headerKey!]: headerValue!,
        },
      },
    );
    const json = await res.json();

    // console.log(`📊 fetchFestivals 호출: 페이지 ${pageParam}`, json);
    if (!res.ok) throw new Error(json.message || "축제 데이터 조회 실패");
    return json;
  } catch (error) {
    console.error("축제 데이터 조회 중 오류 발생:", error);
    throw new Error(error instanceof Error ? error.message : "알 수 없는 오류");
  }
};
