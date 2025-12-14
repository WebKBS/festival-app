export interface DetailInfo {
  /**
   *  콘텐츠 ID
   */
  contentid: string | null;

  /**
   * 콘텐츠 타입 ID
   */
  contenttypeid: string | null;

  /**
   * 축제 제목
   */
  title: string | null;

  /**
   * 등록일
   */
  createdtime: string | null;

  /**
   * 수정일
   */
  modifiedtime: string | null;

  /**
   * 전화번호
   */
  tel: string | null;

  /**
   * 전화번호 이름
   */
  telname: string | null;

  /**
   * 홈페이지 URL
   */
  homepage: string | null;

  /**
   * 대표 이미지 URL - 원본
   */
  firstimage: string | null;

  /**
   * 대표 이미지 URL - 썸네일
   */
  firstimage2: string | null;

  /**
   * 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지))
   */
  cpyrhtDivCd: string | null;

  /**
   * 지역 코드
   */
  areacode: string | null;

  /**
   * 시군구 코드
   */
  sigungucode: string | null;

  /**
   * 법정동 시도코드
   */
  lDongRegnCd: string | null;

  /**
   * 법정동 시군구 코드
   */
  lDongSignguCd: string | null;

  /**
   * 시스템 분류 코드 1
   */
  lclsSystm1: string | null;

  /**
   * 시스템 분류 코드 2
   */
  lclsSystm2: string | null;

  /**
   * 시스템 분류 코드 3
   */
  lclsSystm3: string | null;

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
   * 주소
   */
  addr1: string | null;

  /**
   * 상세 주소
   */
  addr2: string | null;

  /**
   * 우편번호
   */
  zipcode: string | null;

  /**
   * 지도 X 좌표
   */
  mapx: string | null;

  /**
   * 지도 Y 좌표
   */
  mapy: string | null;

  /**
   * 지도 레벨
   */
  mlevel: string | null;

  /**
   * 축제 개요
   */
  overview: string | null;
}
