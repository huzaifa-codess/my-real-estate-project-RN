import { View, Text, ViewComponent, Image, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  <View>
    <Image
      source={icon}
      tintColor={focused ? "#0061ff" : "#666876"}
      resizeMode="contain"
      style={{ height: 24, width: 24 }}
    />
    <Text
      style={[
        styles.textStyle,
        focused ? styles.focusedText : styles.defaultText,
      ]}
    >
      {title}
    </Text>
  </View>
);
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          // minHeight: 80,
          height: 80,
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} focused={focused} title="Explore" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 12,
    width: "100%",
    textAlign: "center",
    marginTop: 4,
  },
  focusedText: {
    color: "#0061FF", // Replace with actual hex code for primary-300
    fontFamily: "Rubik-Medium",
  },
  defaultText: {
    color: "#0061FF1A", // Replace with actual hex code for black-200
    fontFamily: "Rubik",
  },
});
