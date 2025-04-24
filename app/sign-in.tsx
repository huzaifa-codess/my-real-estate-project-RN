import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
// import "./global.css";

const signin = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
      console.log("login successful");
    } else {
      Alert.alert("Error", "failed to login");
    }
  };

  return (
    <View>
      <ScrollView>
        <Image
          style={{
            marginVertical: 15,
            height: "100%",
            width: "100%",
            aspectRatio: 1,
            resizeMode: "stretch",
            marginHorizontal: 5,
          }}
          source={images.onboarding}
          // className="w-full h-4/6"
          // resizeMode="contain"
        />
      </ScrollView>
      <Text style={styles.welcomeText}>welcome to ReState</Text>
      <Text style={styles.punchLine}>
        Let's Get You Closer To{"\n"}
        <Text style={{ color: "#0061FF" }}>Your Ideal Home</Text>
      </Text>
      <Text style={styles.loginText}>Login to ReState with google</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            width: "90%",
            alignSelf: "center",
            padding: 12,
            borderRadius: 20,
            elevation: 2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
          }}
        >
          <Image
            source={icons.google}
            style={{
              width: 24,
              height: 24,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Rubik_500Medium",
            }}
          >
            Continue with google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default signin;

const styles = StyleSheet.create({
  welcomeText: {
    marginTop: 10,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Rubik_300Light",
    color: "#191D31",
  },
  punchLine: {
    marginTop: 15,
    textAlign: "center",
    fontFamily: "Rubik_700Bold",
    fontSize: 25,
  },
  loginText: {
    textAlign: "center",
    color: "#666876",
    marginTop: 30,
    fontFamily: "Rubik_300Light",
  },
  LoginButton: {
    backgroundColor: "black",
    shadowColor: "black",
  },
  buttonContainer: {
    marginTop: 30,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
