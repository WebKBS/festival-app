import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useRouter } from "expo-router";
import { queryClient } from "@/lib/tanstack/tanstack-query";

export const useAppState = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const lastBackgroundTime = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (appState.current.match(/active/) && nextAppState === "background") {
          // 앱이 백그라운드로 내려감 → 시간 기록
          lastBackgroundTime.current = Date.now();
          console.log(
            "App moved to background, time recorded:",
            lastBackgroundTime.current,
          );
        }

        if (
          appState.current.match(/background|inactive/) &&
          nextAppState === "active"
        ) {
          // 앱이 다시 활성화됨 → 시간 체크
          if (lastBackgroundTime.current) {
            const diff = Date.now() - lastBackgroundTime.current;

            // 15분
            const minutes = 15 * 60 * 1000;

            if (diff > minutes) {
              // 10분 이상 → 홈으로 이동 + 데이터 새로고침
              console.log("10분 초과 - 홈으로 이동 및 데이터 새로고침");

              // 스택 여부 확인
              if (router.canDismiss()) {
                // 홈으로 이동
                router.dismissAll();
              }

              router.navigate("/(tabs)");

              // 쿼리 무효화 (캐시 초기화)
              queryClient.removeQueries();
            }
          }
        }

        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [router]);

  return null;
};
