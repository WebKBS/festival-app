import { Image } from "expo-image";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ZoomableImage = ({
  uri,
  onZoomStatusChange,
}: {
  uri: string;
  onZoomStatusChange: (isZoomed: boolean) => void;
}) => {
  const NO_IMAGE_URI = require("@/assets/images/common/no-image.png");

  // 애니메이션 값 (크기 및 위치)
  const scale = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // 제스처 상태 추적용 변수 (useRef 사용)
  const baseScale = useRef(1);
  const pinchScale = useRef(1);
  const lastScale = useRef(1);
  const initialDistance = useRef(0);

  const panValue = useRef({ x: 0, y: 0 });

  // 두 손가락 거리 계산 함수
  const calcDistance = (event: GestureResponderEvent) => {
    const touches = event.nativeEvent.touches;
    if (touches.length < 2) return 0;
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const panResponder = useRef(
    PanResponder.create({
      // 터치 시작 시 PanResponder 활성화 여부 결정
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      // 터치 시작
      onPanResponderGrant: (event) => {
        if (event.nativeEvent.touches.length === 2) {
          // 핀치 줌 시작: 초기 거리 저장
          initialDistance.current = calcDistance(event);
        } else {
          // 팬(이동) 시작: 현재 위치 값을 오프셋으로 설정하고 값 초기화
          pan.setOffset({
            x: panValue.current.x,
            y: panValue.current.y,
          });
          pan.setValue({ x: 0, y: 0 });
        }
      },

      // 터치 이동 중
      onPanResponderMove: (event, gestureState) => {
        const activeTouches = event.nativeEvent.touches.length;

        if (activeTouches === 2) {
          // 핀치 줌 로직
          const currentDistance = calcDistance(event);
          if (initialDistance.current > 0) {
            pinchScale.current = currentDistance / initialDistance.current;
            // 현재 스케일 = 기본 스케일 * 핀치 변화량
            const targetScale = Math.max(
              1,
              Math.min(baseScale.current * pinchScale.current, 5), // 최대 5배까지
            );

            scale.setValue(targetScale);
            lastScale.current = targetScale;

            // 확대 중이면 부모 스크롤 잠금
            if (targetScale > 1.05) {
              onZoomStatusChange(true);
            }
          }
        } else if (activeTouches === 1 && baseScale.current > 1) {
          // 팬(이동) 로직: 이미지가 확대된 상태에서만 이동 가능
          // 부모 스크롤 잠금 (확실하게 하기 위해)
          onZoomStatusChange(true);

          Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false,
          })(event, gestureState);
        }
      },

      // 터치 종료
      onPanResponderRelease: () => {
        // 팬 오프셋 병합
        pan.flattenOffset();

        if (lastScale.current < 1.1) {
          // 크기가 거의 1배율로 돌아왔으면 초기화
          Animated.parallel([
            Animated.spring(scale, { toValue: 1, useNativeDriver: false }),
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }),
          ]).start();

          baseScale.current = 1;
          lastScale.current = 1;
          onZoomStatusChange(false); // 부모 스크롤 잠금 해제
        } else {
          // 확대 상태 유지
          baseScale.current = lastScale.current;
          onZoomStatusChange(true); // 부모 스크롤 잠금 유지
        }
      },
    }),
  ).current;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [
            { scale: scale },
            { translateX: pan.x },
            { translateY: pan.y },
          ],
          width: width,
          height: height,
        }}
      >
        <Image
          source={uri ? { uri } : NO_IMAGE_URI}
          style={{ width: "100%", height: "100%" }} // 부모 크기에 맞춤
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
};

export default ZoomableImage;
