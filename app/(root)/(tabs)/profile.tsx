import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Rubik_700Bold } from "@expo-google-fonts/rubik";
import icons from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

interface settingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: any;
  showArrow?: boolean;
}
const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: settingsItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.settingsLayout}>
    <View style={styles.settingsContentLayout}>
      <Image source={icon} style={{ maxHeight: 30, maxWidth: 30 }} />
      <Text style={[styles.settingsText, textStyle]}>{title}</Text>
    </View>
    {showArrow && (
      <Image
        source={icons.rightArrow}
        style={{ height: 20, width: 20, marginRight: 20 }}
      />
    )}
  </TouchableOpacity>
);

const profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("error", "An error occured while logging out");
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerStyle}>profile</Text>
          <Image source={icons.bell} style={{ height: 30, width: 30 }} />
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarStyle}>
            <Image
              source={{ uri: user?.avatar }}
              style={styles.avatarImgStyle}
            />
            <TouchableOpacity style={{ bottom: 34, left: 50 }}>
              <Image source={icons.edit} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
            <Text style={styles.headerStyle}> {user?.name} </Text>
          </View>
        </View>
        <View style={styles.settingsContainer}>
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   marginTop: 10,
          //   paddingTop: 10,
          //   marginLeft: 20,
          // }}
          style={styles.settingsContainer}
        >
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   marginTop: 10,
          //   paddingTop: 10,
          // }}
          style={styles.settingsContainer}
        >
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            showArrow={false}
            onPress={handleLogout}
            textStyle={[styles.dangertext]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  headerStyle: {
    fontSize: 20,
    fontFamily: "Rubik_700Bold",
  },
  settingsText: {
    fontSize: 15,
    fontFamily: "Rubik_500Medium",
  },
  headerContainer: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginHorizontal: 10,
  },
  avatarContainer: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  avatarStyle: {
    // flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  avatarImgStyle: {
    height: 125,
    width: 125,
    borderRadius: 100,
  },
  settingsLayout: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  settingsContentLayout: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  settingsContainer: {
    // flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: 50,
    marginLeft: 20,
  },
  dangertext: {
    color: "#F75555",
  },
});
