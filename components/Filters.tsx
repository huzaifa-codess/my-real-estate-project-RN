import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { categories } from "@/constants/data";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();

  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );
  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 10, marginBottom: 10 }}
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategoryPress(item.category)}
          style={[
            styles.categoryButton,
            selectedCategory === item.category
              ? styles.selectedCategory
              : styles.unselectedCategory,
          ]}
        >
          <Text style={{ fontSize: 12 }}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;

const styles = StyleSheet.create({
  categoryButton: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
  },
  selectedCategory: {
    backgroundColor: "#0061FF", // Replace with your "primary-300"
  },
  unselectedCategory: {
    backgroundColor: "#0061FF0A", // Replace with your "primary-100"
    borderWidth: 1,
    borderColor: "#0061FF1A", // Replace with your "primary-200"
  },
});
