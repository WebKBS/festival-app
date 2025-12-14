export interface FestivalResponse {
  message: string;
  data: {
    items: {
      item: FestivalTypes[];
    };
    numOfRows: number; // 한 페이지에 표시할 데이터의 개수
    pageNo: number; // 현재 페이지 번호
    totalCount: number; // 전체 데이터의 개수;
  };
}

export interface FestivalTypes {
  /**
   * 축제 주소
   */
  addr1: string | null;
  /**
   * 축제 상세 주소
   */
  addr2: string | null;
  /**
   * 우편번호
   */
  zipCode: string | null;
  /**
   * 대분류
   */
  cat1: string | null;
  /**
   * 중분류
   */
  cat2: string | null;
  /**
   * 소분류
   */
  cat3: string | null;
  /**
   * 콘텐츠 ID
   */
  contentId: string | null;
  /**
   * 콘텐츠 타입 ID
   */
  contentTypeId: string | null;
  /**
   * 등록일
   */
  createdTime: string | null;
  /**
   * 축제 시작일
   */
  eventStartDate: string | null;
  /**
   * 축제 종료일
   */
  eventEndDate: string | null;
  /**
   * 대표 이미지 URL - 원본
   */
  firstImage: string | null;
  /**
   * 대표 이미지 URL - 썸네일
   */
  firstImage2: string | null;
  /**
   * 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)
   */
  cpyrhtDivCd: string | null;
  /**
   * 지도 X 좌표
   */
  mapX: string | null;
  /**
   * 지도 Y 좌표
   */
  mapY: string | null;
  /**
   * 지도 레벨
   */
  mLevel: string | null;
  /**
   * 수정일
   */
  modifiedTime: string | null;
  /**
   * 지역 코드
   */
  areaCode: string | null;
  /**
   * 시군구 코드
   */
  siGunGuCode: string | null;
  /**
   * 전화번호
   */
  tel: string | null;
  /**
   * 축제 제목
   */
  title: string | null;
  /**
   * 법정동 시도코드
   */
  lDongRegnCd: string | null;
  /**
   * 법정동 시군구코드
   */
  lDongSignguCd: string | null;
  /**
   * 분류체계 1Depth
   */
  lclsSystm1: string | null;
  /**
   * 분류체계 2Depth
   */
  lclsSystm2: string | null;
  /**
   * 분류체계 3Depth
   */
  lclsSystm3: string | null;
  /**
   * 축제형태(취소,행사연기)
   */
  progressType: string | null;
  /**
   * 진행형태(상시,온라인,격년제)
   */
  festivalType: string | null;
}
