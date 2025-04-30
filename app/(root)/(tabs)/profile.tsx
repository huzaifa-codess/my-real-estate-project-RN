import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 128, paddingHorizontal: 28 }}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerStyle}>profile</Text>
          <Image source={icons.bell} style={{ height: 20, width: 20 }} />
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
          style={[
            styles.settingsContainer,
            { borderTopWidth: 1, borderTopColor: "#0061FF1A" },
          ]}
        >
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View
          style={[
            styles.settingsContainer,
            {
              borderTopWidth: 1,
              borderTopColor: "#0061FF1A",
              marginTop: 20,
              paddingTop: 20,
            },
          ]}
        >
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle={{ color: "#F75555" }}
            showArrow={false}
            onPress={handleLogout}
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
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  headerStyle: {
    fontSize: 20,
    fontFamily: "Rubik_700Bold",
  },
  settingsText: {
    fontSize: 15,
    fontFamily: "Rubik_500Medium",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  avatarStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
  },
  avatarImgStyle: {
    height: 176,
    width: 176,
    borderRadius: 9999,
  },
  settingsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 40,
  },
  settingsLayout: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingsContentLayout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
