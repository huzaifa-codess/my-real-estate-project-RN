import { Link, router, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
  Rubik_300Light_Italic,
  Rubik_400Regular_Italic,
  Rubik_500Medium_Italic,
  Rubik_600SemiBold_Italic,
  Rubik_700Bold_Italic,
  Rubik_800ExtraBold_Italic,
  Rubik_900Black_Italic,
} from "@expo-google-fonts/rubik";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, FeaturedCard } from "@/components/Cards";
import { ScrollView, FlatList } from "react-native";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import seed from "@/lib/seed";
import { useEffect } from "react";
import { Query } from "react-native-appwrite";
import NoResult from "@/components/NoResult";

export default function Explore() {
  let [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,
    Rubik_300Light_Italic,
    Rubik_400Regular_Italic,
    Rubik_500Medium_Italic,
    Rubik_600SemiBold_Italic,
    Rubik_700Bold_Italic,
    Rubik_800ExtraBold_Italic,
    // Rubik_900Black_Italic,
  });

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params?.filter!,
      query: params?.query!,
      limit: 20,
    },
    skip: true,
    // enabled: !!(params.query || params.filter),
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  // if (!fontsLoaded) {
  //   return (
  //     <View>
  //       <Text>Loading fonts...</Text>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", height: "100%", width: "100%" }}
    >
      {/* <Button title="seed" onPress={seed} /> */}
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item?.$id || item.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContentStyle}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size={"large"} style={{}} />
          ) : (
            <NoResult />
          )
        }
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: 9999,
                  width: 44,
                  height: 44,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.backArrow}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Rubik_500Medium",
                  marginRight: 8,
                  textAlign: "center",
                  color: "#191d31",
                }}
              >
                Search for your ideal home
              </Text>
              <Image source={icons.bell} style={{ width: 24, height: 24 }} />
            </View>
            <Search />
            <View style={{ marginTop: 20 }}>
              <Filters />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Rubik_700Bold",
                  color: "#191d31",
                  marginTop: 20,
                }}
              >
                Found {properties?.length} properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  flatlistContentStyle: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  featuredCard: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Rubik_700Bold",
    color: "#191d31",
  },
  link: {
    fontFamily: "Rubik_700Bold",
    color: "#0061FF",
  },
});
