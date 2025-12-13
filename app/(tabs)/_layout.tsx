import HomeHeader from "@/components/headers/HomeHeader";
import { Colors } from "@/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.blue,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          // animation: "fade",
          title: "축제정보",
          header: () => <HomeHeader />,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="festival" size={24} color={color} />
          ),
        }}
        listeners={() => ({
          tabPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          // animation: "fade",
          headerShown: false,
          title: "검색",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
        listeners={() => ({
          tabPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
      {/*<Tabs.Screen*/}
      {/*  name="map/index"*/}
      {/*  options={{*/}
      {/*    animation: "fade",*/}
      {/*    headerShown: false,*/}
      {/*    title: "여행지도",*/}
      {/*    tabBarIcon: ({ color }) => (*/}
      {/*      <Ionicons name="map" size={24} color={color} />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*  listeners={() => ({*/}
      {/*    tabPress: async () => {*/}
      {/*      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);*/}
      {/*    },*/}
      {/*  })}*/}
      {/*/>*/}
      <Tabs.Screen
        name="watch-list/index"
        options={{
          // animation: "fade",
          title: "관심목록",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={24} color={color} />
          ),
        }}
        listeners={() => ({
          tabPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
    </Tabs>
  );
};

export default TabLayout;
