import { Colors } from "@/constants/colors";
import { Font } from "@/constants/fonts";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

interface KakaoMapProps {
  latitude: number; // 위도
  longitude: number; // 경도
  mlevel: number; // 확대 레벨 (optional)
}

const KakaoMap = ({ latitude, longitude, mlevel = 3 }: KakaoMapProps) => {
  const kakaoKey = process.env.EXPO_PUBLIC_KAKAO_MAP_KEY;
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        </style>
        <script
          type="text/javascript"
          src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services,clusterer,drawing"
        ></script>
      </head>
      <body>
        <div id="map" style="width:100%;height:300px;"></div>

        <script>        
          window.onload = function () {
            const container = document.getElementById("map");
            const options = {
              center: new kakao.maps.LatLng(${latitude}, ${longitude}),
              level: ${mlevel}
            };
            const map = new kakao.maps.Map(container, options);

            // 마커 생성
            const markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
            const marker = new kakao.maps.Marker({
              position: markerPosition
            });

            // 마커를 지도에 표시
            marker.setMap(map);
          };
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ html: htmlContent }}
        style={styles.webview}
      />
      <Pressable
        style={styles.findButton}
        onPress={() => {
          const url = `https://map.kakao.com/link/map/${latitude},${longitude}`;
          // 웹 브라우저에서 URL 열기
          Linking.openURL(url);
        }}
      >
        <Text style={styles.findButtonText}>길찾기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 240, // 원하는 높이로 조정
    position: "relative",
  },
  webview: {
    width: "100%",
    height: 240,
    padding: 0,
    margin: 0,
  },

  findButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: Colors.blue,
    padding: 8,
    borderRadius: 5,
    elevation: 3, // 안드로이드 그림자
    shadowColor: "#000", // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  findButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: Font.bold,
  },
});

export default KakaoMap;
