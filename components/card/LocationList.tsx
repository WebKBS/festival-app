import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import React from "react";
import { REGION_LIST } from "@/constants/location/region.const";

interface LocationListProps {
  location: string;
  onPress: (location: string) => void;
}

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 6;
const ITEM_MARGIN = 4;
const ITEM_WIDTH = (width - ITEM_MARGIN * 2 * COLUMN_COUNT - 32) / COLUMN_COUNT;

const LocationList = ({ location, onPress }: LocationListProps) => {
  return (
    <View style={styles.regionContainer}>
      <Text style={styles.regionLTitle}>지역 선택</Text>
      <View style={styles.regionList}>
        <Pressable
          onPress={() => onPress("ALL")}
          style={{
            ...styles.regionItem,
            backgroundColor: location === "ALL" ? Colors.blue : "#fff",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: location === "ALL" ? "#fff" : "#000",
              fontFamily:
                location === "ALL" ? "Pretendard-Bold" : "Pretendard-Regular",
            }}
          >
            전체
          </Text>
        </Pressable>
        {REGION_LIST.map((region) => (
          <Pressable
            key={region.code}
            onPress={() => onPress(region.code)}
            style={{
              ...styles.regionItem,
              backgroundColor: location === region.code ? Colors.blue : "#fff",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: location === region.code ? "#fff" : "#000",
                fontFamily:
                  location === region.code
                    ? "Pretendard-Bold"
                    : "Pretendard-Regular",
              }}
            >
              {region.shortName}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default LocationList;

const styles = StyleSheet.create({
  regionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  regionLTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  regionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  regionItem: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    margin: ITEM_MARGIN,
    width: ITEM_WIDTH,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
});
