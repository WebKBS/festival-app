export interface FestivalIntroTypes {
  /**
   * 콘텐츠 ID
   */
  contentid: string | null;

  /**
   * 콘텐츠 타입 ID
   */
  contenttypeid: string | null;

  /**
   * 주최자 정보
   */
  sponsor1: string | null;

  /**
   * 주최자 전화번호
   */
  sponsor1tel: string | null;

  /**
   * 주관사 이름
   */
  sponsor2: string | null;

  /**
   * 주관사 전화번호
   */
  sponsor2tel: string | null;

  /**
   * 축제 종료일 (yyyyMMdd)
   */
  eventenddate: string | null;

  /**
   * 공연(행사) 시간
   */
  playtime: string | null;

  /**
   * 행사 장소
   */
  eventplace: string | null;

  /**
   * 행사 홈페이지 URL
   */
  eventhomepage: string | null;

  /**
   * 연령 제한
   */
  agelimit: string | null;

  /**
   * 예약 장소
   */
  bookingplace: string | null;

  /**
   * 행사 장소 정보
   */
  placeinfo: string | null;

  /**
   * 부대 행사 정보
   */
  subevent: string | null;

  /**
   * 행사 프로그램 정보
   */
  program: string | null;

  /**
   * 축제 시작일 (yyyyMMdd)
   */
  eventstartdate: string | null;

  /**
   * 이용 요금 정보
   */
  usetimefestival: string | null;

  /**
   * 할인 정보
   */
  discountinfofestival: string | null;

  /**
   * 소요 시간 정보
   */
  spendtimefestival: string | null;

  /**
   * 축제 등급 정보
   */
  festivalgrade: string | null;

  /**
   * 진행 방식 정보
   */
  progresstype: string | null;

  /**
   * 축제 유형 정보
   */
  festivaltype: string | null;
}
