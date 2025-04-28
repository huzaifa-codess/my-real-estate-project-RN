import { Link, router, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
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

export default function Index() {
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

  // if (!fontsLoaded) {
  //   return (
  //     <View>
  //       <Text>Loading fonts...</Text>
  //     </View>
  //   ); // Or a SplashScreen, etc.
  // }

  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({ fn: getLatestProperties });

  const { data: properties, loading: propertiesLoading } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params?.filter || "",
      query: params?.query || "",
      limit: 6,
    },
    enabled: !!(params.query || params.filter),
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", height: "100%", width: "100%" }}
    >
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card
          // item={item}
          // onPress={() => handleCardPress(item.$id)}
          // image={{ uri: item?.image || images.newYork }}
          // title={item?.title}
          // address={item?.location}
          // price={`$${item?.price}`}
          // addressStyle={{ color: "black" }}
          // titleStyle={{ color: "black" }}
          // // infoBlockStyle={{ position: "relative",  }}
          // priceStyle={{ color: "#0061FF" }}
          // heartIconStyle={{ tintColor: "black" }}
          // containerStyle={{ marginRight: 10, marginBottom: 10 }}
          // imageStyle={{
          //   display: "flex",
          //   position: "relative",
          //   bottom: 20,
          //   marginBottom: 20,
          // }}
          // ratingWrapperStyle={{ height: 30, width: 50 }}
          />
        )}
        keyExtractor={(item) => item?.$id || item.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContentStyle}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 10 }}>
            <View style={styles.containerStyle}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: user?.avatar }}
                  style={{ borderRadius: 50, width: 50, height: 50 }}
                />
                <View style={{ marginLeft: 10, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Rubik_300Light",
                      color: "#8C8E98",
                    }}
                  >
                    Good Morning
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Rubik_500Medium",
                      color: "#191d31",
                    }}
                  >
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} style={{ height: 30, width: 30 }} />
            </View>

            <Search />

            <View style={{ marginVertical: 20 }}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured</Text>
                <TouchableOpacity>
                  <Text style={styles.link}>See All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={latestProperties}
                renderItem={({ item }) => (
                  <FeaturedCard
                  // item={item}
                  // onPress={() => handleCardPress(item.$id)}
                  // image={{ uri: item?.image || images.japan }}
                  // title={item?.title}
                  // address={item?.location}
                  // price={`$${item?.price}`}
                  // containerStyle={{}}
                  />
                )}
                keyExtractor={(item) => item?.$id || item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredCard}
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Our Recomendations</Text>
              <TouchableOpacity>
                <Text style={styles.link}>See All</Text>
              </TouchableOpacity>
            </View>

            <Filters />
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
