export interface ImageInfo {
  /**
   * 콘텐츠 ID
   */
  contentid: string | null;

  /**
   * 원본 이미지 URL
   */
  originimgurl: string | null;

  /**
   * 이미지 이름
   */
  imgname: string | null;

  /**
   * 썸네일 이미지 URL
   */
  smallimageurl: string | null;

  /**
   * 저작권 구분 유형
   */
  cpyrhtDivCd: string | null;

  /**
   * 이미지 일련번호
   */
  serialnum: string | null;
}
