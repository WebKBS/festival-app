import { apiUrl, headerKey, headerValue } from "@/constants/config";
import { FestivalResponse } from "@/types/festival.types";

export const getFestivalSearch = async ({
  pageParam = 1,
  keyword = "",
  areaCode = "",
  sigunguCode = "",
  arrange = "A",
  size = 20,
}): Promise<FestivalResponse> => {
  const res = await fetch(
    `${apiUrl}/api/festival-search?page=${pageParam}&size=${size}&keyword=${encodeURIComponent(keyword)}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&arrange=${arrange}`,
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
};
