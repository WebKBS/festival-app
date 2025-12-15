export const telBrReplace = (tel: string): string => {
  // 전화번호에서 'br' 태그를 제거하고 공백을 추가
  return tel.replace(/<br\s*\/?>/gi, "\n").trim();
};

// 전화번호 추출 함수
export const extractFirstPhoneNumber = (phoneStr: string) => {
  if (!phoneStr) return "";

  // HTML 태그 제거 (예: <br/>)
  const cleanStr = phoneStr.replace(/<[^>]*>/g, " ");

  // 한국 전화번호 패턴들
  const phonePatterns = [
    // 일반 지역번호 (02-xxxx-xxxx, 031-xxx-xxxx, 051-xxx-xxxx 등)
    /(\d{2,3}-\d{3,4}-\d{4})/g,
    // 특수번호 (1544-xxxx, 1588-xxxx, 1577-xxxx 등)
    /(1\d{3}-\d{4})/g,
    // 인터넷전화 (0505-xxxx-xxxx, 070-xxxx-xxxx)
    /(0505-\d{4}-\d{4})/g,
    /(070-\d{4}-\d{4})/g,
    // 휴대폰 (010-xxxx-xxxx)
    /(010-\d{4}-\d{4})/g,
    // 무료전화 (080-xxx-xxxx)
    /(080-\d{3}-\d{4})/g,
    // 기타 특수번호 (예: 114, 119 등은 제외하고 상업용만)
    /(15\d{2}-\d{4})/g,
    /(16\d{2}-\d{4})/g,
    /(18\d{2}-\d{4})/g,
  ];

  // 각 패턴을 순서대로 확인
  for (const pattern of phonePatterns) {
    const matches = cleanStr.match(pattern);
    if (matches && matches.length > 0) {
      return matches[0]; // 첫 번째 매칭된 전화번호 반환
    }
  }

  // 어떤 패턴에도 매칭되지 않으면 숫자와 하이픈만 추출해서 첫 번째 전화번호 형태로 만들기
  const numbersOnly = cleanStr.replace(/[^\d-]/g, "");
  const firstPhone = numbersOnly.split(/[,\s~]/)[0];

  return firstPhone.trim();
};
