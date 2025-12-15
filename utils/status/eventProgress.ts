import { parse } from "date-fns";

/**
 * 이벤트의 시작일과 종료일을 비교하여 현재 상태를 반환하는 함수
 * @param eventstartdate - 이벤트 시작일 (YYYYMMDD 형식)
 * @param eventenddate - 이벤트 종료일 (YYYYMMDD 형식)
 * @returns 이벤트 상태 문자열 ("예정 D-#", "진행중", "종료")
 */
export const getEventStatus = (
  eventstartdate: string,
  eventenddate: string,
): string => {
  const today = new Date();
  const start = new Date(
    Number(eventstartdate.slice(0, 4)),
    Number(eventstartdate.slice(4, 6)) - 1,
    Number(eventstartdate.slice(6, 8)),
  );
  const end = new Date(
    Number(eventenddate.slice(0, 4)),
    Number(eventenddate.slice(4, 6)) - 1,
    Number(eventenddate.slice(6, 8)),
  );

  // 오늘 날짜만 비교를 위해 시, 분, 초 제거
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (today < start) {
    const diff = Math.ceil(
      (start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `예정 D-${diff}`;
  } else if (today >= start && today <= end) {
    return "진행중";
  } else {
    return "종료";
  }
};

/**
 * 이벤트의 시작일과 종료일을 기반으로 상태에 따라 색상을 반환하는 함수
 * @param eventstartdate
 * @param eventenddate
 */
export const getStatusColor = (
  eventstartdate: string,
  eventenddate: string,
): string => {
  if (!eventstartdate || !eventenddate) return "#666"; // 기본 색상

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = parse(eventstartdate, "yyyyMMdd", new Date());
  const end = parse(eventenddate, "yyyyMMdd", new Date());
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (today < start) return "#F59E0B"; // 예정
  if (today >= start && today <= end) return "#3B82F6"; // 진행중
  return "#9CA3AF"; // 종료
};
