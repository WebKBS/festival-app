import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack/tanstack-query";
import { useAppState } from "@/hooks/useAppState";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/db/migrations/migrations";
import { db } from "@/db";
import { AppText } from "@/components/text/AppText";

// 이 부분은 앱이 로드될 때 스플래시 스크린을 자동으로 숨기지 않도록 설정합니다.
SplashScreen.preventAutoHideAsync().then().catch(console.error);

export default function RootLayout() {
  const { success, error: dbError } = useMigrations(db, migrations);

  const [loaded, error] = useFonts({
    "Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.otf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().then().catch(console.error);
    }
  }, [loaded, error]);

  /** 앱 상태 변화를 처리하는 훅을 호출합니다. */
  useAppState();

  if (!loaded && !error) {
    return null;
  }

  if (dbError) {
    return (
      <View style={styles.fullscreenCenter}>
        <View style={styles.noticeCardError}>
          <AppText style={styles.noticeTitle} weight="bold">
            데이터베이스 마이그레이션 오류
          </AppText>
          <AppText style={styles.noticeBody}>
            {dbError.message || "알 수 없는 오류가 발생했습니다."}
          </AppText>
        </View>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={styles.fullscreenCenter}>
        <View style={styles.noticeCard}>
          <AppText style={styles.noticeTitle} weight="bold">
            데이터베이스 준비 중
          </AppText>
          <AppText style={styles.noticeBody}>
            마이그레이션을 적용하고 있어요. 잠시만 기다려주세요.
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <SQLiteProvider databaseName={"db.db"} options={{ useNewConnection: true }}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="festival/[id]/index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        {Platform.OS === "ios" ? (
          <StatusBar
            backgroundColor={"transparent"}
            showHideTransition={"fade"}
            animated={true}
            barStyle={"default"}
            translucent={true}
          />
        ) : (
          <StatusBar
            backgroundColor={"black"}
            showHideTransition={"fade"}
            animated={true}
            barStyle={"default"}
          />
        )}
      </QueryClientProvider>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  fullscreenCenter: {
    flex: 1,
    backgroundColor: "#0b1021",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  noticeCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    maxWidth: 420,
    width: "100%",
  },
  noticeCardError: {
    backgroundColor: "rgba(255, 99, 71, 0.1)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.6)",
    maxWidth: 420,
    width: "100%",
  },
  noticeTitle: {
    fontSize: 18,
    color: "#e5e7eb",
    marginBottom: 8,
  },
  noticeBody: {
    fontSize: 15,
    color: "#cbd5e1",
    lineHeight: 22,
  },
});
