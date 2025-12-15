import { apiUrl, headerKey, headerValue } from "@/constants/config";
import { FestivalDetailResponse } from "@/types/festivalDetail.types";

export const getFestivalDetail = async (
  contentId: string,
): Promise<FestivalDetailResponse> => {
  const res = await fetch(`${apiUrl}/api/festival-detail/${contentId}`, {
    method: "GET",
    headers: {
      [headerKey!]: headerValue!,
    },
  });
  const json = await res.json();

  // console.log(`📷 getFestivalDetail 호출: contentId ${contentId}`, json);
  if (!res.ok) throw new Error(json.message || "축제 데이터 조회 실패");
  return json;
};
