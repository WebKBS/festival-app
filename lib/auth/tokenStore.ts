// // src/lib/auth/tokenStore.ts
// import * as SecureStore from "expo-secure-store";
//
// const ACCESS = "accessToken";
// const REFRESH = "refreshToken";
//
// export const tokenStore = {
//   getAccessToken: () => SecureStore.getItemAsync(ACCESS),
//   setAccessToken: (token: string) => SecureStore.setItemAsync(ACCESS, token),
//
//   getRefreshToken: () => SecureStore.getItemAsync(REFRESH),
//   setRefreshToken: (token: string) => SecureStore.setItemAsync(REFRESH, token),
//
//   clear: async () => {
//     await SecureStore.deleteItemAsync(ACCESS);
//     await SecureStore.deleteItemAsync(REFRESH);
//   },
// };
