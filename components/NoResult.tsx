import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "@/constants/images";
import { Rubik_700Bold } from "@expo-google-fonts/rubik";

const NoResult = () => {
  return (
    <View style={{ display: "flex", alignItems: "center", marginVertical: 20 }}>
      <Image
        source={images.noResult}
        style={{ width: "91.66%", height: 320 }}
      />
      <Text
        style={{
          fontFamily: "Rubik_700Bold",
          fontSize: 24,
          color: "#191d31",
          marginTop: 20,
        }}
      >
        No Results
      </Text>

      <Text style={{ fontSize: 16, color: "#8C8E98", marginTop: 8 }}>
        We could not find any results
      </Text>
    </View>
  );
};

export default NoResult;

const styles = StyleSheet.create({});
