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
  addr1: string;
  /**
   * 축제 상세 주소
   */
  addr2: string;
  /**
   * 우편번호
   */
  zipcode: string;
  /**
   * 대분류
   */
  cat1: string;
  /**
   * 중분류
   */
  cat2: string;
  /**
   * 소분류
   */
  cat3: string;
  /**
   * 콘텐츠 ID
   */
  contentid: string;
  /**
   * 콘텐츠 타입 ID
   */
  contenttypeid: string;
  /**
   * 등록일
   */
  createdtime: string;
  /**
   * 축제 시작일
   */
  eventstartdate: string;
  /**
   * 축제 종료일
   */
  eventenddate: string;
  /**
   * 대표 이미지 URL - 원본
   */
  firstimage: string;
  /**
   * 대표 이미지 URL - 썸네일
   */
  firstimage2: string;
  /**
   * 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)
   */
  cpyrhtDivCd: string;
  /**
   * 지도 X 좌표
   */
  mapx: string;
  /**
   * 지도 Y 좌표
   */
  mapy: string;
  /**
   * 지도 레벨
   */
  mlevel: string;
  /**
   * 수정일
   */
  modifiedtime: string;
  /**
   * 지역 코드
   */
  areacode: string;
  /**
   * 시군구 코드
   */
  sigungucode: string;
  /**
   * 전화번호
   */
  tel: string;
  /**
   * 축제 제목
   */
  title: string;
  /**
   * 법정동 시도코드
   */
  lDongRegnCd: string;
  /**
   * 법정동 시군구코드
   */
  lDongSignguCd: string;
  /**
   * 분류체계 1Depth
   */
  lclsSystm1: string;
  /**
   * 분류체계 2Depth
   */
  lclsSystm2: string;
  /**
   * 분류체계 3Depth
   */
  lclsSystm3: string;
  /**
   * 축제형태(취소,행사연기)
   */
  progresstype: string;
  /**
   * 진행형태(상시,온라인,격년제)
   */
  festivaltype: string;
}
