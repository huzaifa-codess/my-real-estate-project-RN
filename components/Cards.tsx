import icons from "@/constants/icons";
import images from "@/constants/images";
import {
  Rubik_500Medium,
  Rubik_700Bold,
  Rubik_800ExtraBold,
} from "@expo-google-fonts/rubik";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: 240,
        height: 320,
        position: "relative",
      }}
    >
      <Image
        source={images.japan}
        style={{ width: "100%", height: "100%", borderRadius: 16 }}
      />
      <Image
        source={images.cardGradient}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 16,
          position: "absolute",
          bottom: 0,
        }}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.9)",
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 9999,
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <Image source={icons.star} style={{ height: 20, width: 20 }} />
        <Text
          style={{ fontSize: 12, fontFamily: "Rubik_700Bold", marginLeft: 4 }}
        >
          4.4
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Rubik_800ExtraBold",
            color: "#ffffff",
          }}
          numberOfLines={1}
        >
          Modern Apartment
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Rubik_500Medium",
            color: "#ffffff",
          }}
        >
          22 W 15th St, New York
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Rubik_800ExtraBold",
              color: "#ffffff",
            }}
          >
            $2,500
          </Text>
          <Image source={icons.heart} style={{ width: 20, height: 20 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        width: "100%",
        marginTop: 16,
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 20,
        // color: "#ffffff",
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 10 },
        // shadowOpacity: 0.7,
        // shadowRadius: 10,
        // elevation: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          paddingHorizontal: 8,
          top: 20,
          right: 20,
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: 4,
          borderRadius: 9999,
          zIndex: 50,
        }}
      >
        <Image source={icons.star} style={{ height: 16, width: 16 }} />
        <Text
          style={{ fontSize: 12, fontFamily: "Rubik_700Bold", marginLeft: 4 }}
        >
          4.4
        </Text>
      </View>

      <Image
        source={images.newYork}
        style={{ width: "100%", height: 160, borderRadius: 8 }}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 8,
          // alignItems: "flex-start",
          // position: "absolute",
          // bottom: 20,
          // left: 20,
          // right: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Rubik_700Bold",
            color: "#191d31",
          }}
        >
          Cozy Studio
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Rubik_500Medium",
            color: "#666876",
          }}
        >
          22 W 15th St, New York
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Rubik_700Bold",
              color: "#0061FF",
            }}
          >
            $2,500
          </Text>
          <Image
            source={icons.heart}
            style={{
              width: 20,
              height: 20,
              marginRight: 8,
              tintColor: "#191d31",
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
