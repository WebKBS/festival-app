import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack/tanstack-query";
import { useAppState } from "@/hooks/useAppState";
import { Platform, StatusBar, View } from "react-native";
import { AppText } from "@/components/text/AppText";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/db/migrations/migrations";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import { db } from "@/db";

// 이 부분은 앱이 로드될 때 스플래시 스크린을 자동으로 숨기지 않도록 설정합니다.
SplashScreen.preventAutoHideAsync().then().catch(console.error);

export default function RootLayout() {
  const dbContext = useSQLiteContext();
  useDrizzleStudio(dbContext);

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

  if (dbError) {
    return (
      <View>
        <AppText>Migration error: {dbError.message}</AppText>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <AppText>Migration is in progress...</AppText>
      </View>
    );
  }

  if (!loaded && !error) {
    return null;
  }

  return (
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
  );
}
