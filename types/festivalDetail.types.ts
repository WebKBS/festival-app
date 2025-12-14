import { ImageInfo } from "@/types/image.types";
import { DetailInfo } from "@/types/detail.types";
import { FestivalIntroTypes } from "@/types/festivalIntro.types";

export interface FestivalDetailResponse {
  message: string;
  data: {
    detail: DetailInfo[];
    images: ImageInfo[]; // 이미지 정보 배열
    intro: FestivalIntroTypes[];
  };
}
