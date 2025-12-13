import React, { useRef } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "@/components/headers/SearchHeader.styles";

interface SearchHeaderProps {
  onBackPress: () => void;
  setIsFocused: (isFocused: boolean) => void;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

const SearchHeader = ({
  onBackPress,
  setIsFocused,
  value,
  onChangeText,
  onSubmit,
}: SearchHeaderProps) => {
  const inputRef = useRef<TextInput>(null);

  const handleClear = () => {
    onChangeText("");
    // 값만 초기화하고 포커스 유지
    inputRef.current?.focus();
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={onBackPress} style={styles.backButton}>
        <Entypo name="chevron-left" size={24} />
      </Pressable>

      {/* 검색 input with right icons */}
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          placeholder="검색어를 입력하세요"
          placeholderTextColor="#999"
          style={styles.input}
          returnKeyType="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
        <View style={styles.rightIcons} pointerEvents="box-none">
          {value?.length > 0 && (
            <Pressable
              onPress={handleClear}
              style={styles.iconButton}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="입력 내용 지우기"
            >
              <Entypo name="cross" size={18} color="#666" />
            </Pressable>
          )}
          <Pressable
            onPress={onSubmit}
            style={[styles.iconButton, styles.searchIcon]}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="검색"
          >
            <Entypo name="magnifying-glass" size={18} color="#333" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SearchHeader;
