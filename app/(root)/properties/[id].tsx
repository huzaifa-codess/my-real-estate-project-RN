import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";

import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={[styles.imageWrapper, { height: windowHeight / 2 }]}>
          <Image
            source={{ uri: property?.image }}
            style={styles.fullSize}
            resizeMode="cover"
          />
          <Image source={images.whiteGradient} style={styles.topOverlay} />

          <View
            style={[
              styles.absoluteTop,
              { top: Platform.OS === "ios" ? 70 : 20 },
            ]}
          >
            <View style={styles.rowBetween}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Image source={icons.backArrow} style={styles.iconSize5} />
              </TouchableOpacity>

              <View style={styles.iconGroup}>
                <Image
                  source={icons.heart}
                  style={styles.iconSize7}
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} style={styles.iconSize7} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailsWrapper}>
          <Text style={styles.propertyName}>{property?.name}</Text>

          <View style={styles.rowGap3}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{property?.type}</Text>
            </View>

            <View style={styles.rowGap2}>
              <Image source={icons.star} style={styles.iconSize5} />
              <Text style={styles.ratingText}>
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View style={styles.bedBathAreaWrapper}>
            {/* Bed */}
            <View style={styles.featureIconWrapper}>
              <Image source={icons.bed} style={styles.iconSize4} />
            </View>
            <Text style={styles.featureText}>{property?.bedrooms} Beds</Text>

            {/* Bath */}
            <View style={[styles.featureIconWrapper, { marginLeft: 28 }]}>
              <Image source={icons.bath} style={styles.iconSize4} />
            </View>
            <Text style={styles.featureText}>{property?.bathrooms} Baths</Text>

            {/* Area */}
            <View style={[styles.featureIconWrapper, { marginLeft: 28 }]}>
              <Image source={icons.area} style={styles.iconSize4} />
            </View>
            <Text style={styles.featureText}>{property?.area} sqft</Text>
          </View>

          <View style={styles.agentSection}>
            <Text style={styles.sectionTitle}>Agent</Text>

            <View style={styles.rowBetweenMarginTop}>
              <View style={styles.rowCenter}>
                <Image
                  source={{ uri: property?.agent.avatar }}
                  style={styles.agentImage}
                />
                <View style={styles.agentInfo}>
                  <Text style={styles.agentName}>{property?.agent.name}</Text>
                  <Text style={styles.agentEmail}>{property?.agent.email}</Text>
                </View>
              </View>

              <View style={styles.iconGroup}>
                <Image source={icons.chat} style={styles.iconSize7} />
                <Image source={icons.phone} style={styles.iconSize7} />
              </View>
            </View>
          </View>

          <View style={styles.overviewSection}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.descriptionText}>{property?.description}</Text>
          </View>

          <View style={styles.facilitiesSection}>
            <Text style={styles.sectionTitle}>Facilities</Text>

            {property?.facilities.length > 0 && (
              <View style={styles.facilitiesList}>
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item
                  );

                  return (
                    <View key={index} style={styles.facilityItem}>
                      <View style={styles.facilityIcon}>
                        <Image
                          source={facility ? facility.icon : icons.info}
                          style={styles.iconSize6}
                        />
                      </View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.facilityText}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {property?.gallery.length > 0 && (
            <View style={styles.gallerySection}>
              <Text style={styles.sectionTitle}>Gallery</Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.galleryImage}
                  />
                )}
              />
            </View>
          )}

          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationRow}>
              <Image source={icons.location} style={styles.iconSize7} />
              <Text style={styles.locationText}>{property?.address}</Text>
            </View>

            <Image source={images.map} style={styles.mapImage} />
          </View>

          {property?.reviews.length > 0 && (
            <View style={styles.reviewsSection}>
              <View style={styles.reviewsHeader}>
                <View style={styles.rowCenter}>
                  <Image source={icons.star} style={styles.iconSize6} />
                  <Text style={styles.reviewsHeaderText}>
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.commentSection}>
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomContent}>
          <View style={styles.bottomPrice}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text numberOfLines={1} style={styles.priceText}>
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  scrollViewContent: {
    paddingBottom: 128,
    backgroundColor: "white",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
  },
  fullSize: {
    width: "100%",
    height: "100%",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 40,
  },
  absoluteTop: {
    zIndex: 50,
    position: "absolute",
    left: 28,
    right: 28,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#D6E4FF", // Primary-200
    borderRadius: 999,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailsWrapper: {
    paddingHorizontal: 20,
    marginTop: 28,
    gap: 8,
  },
  propertyName: {
    fontSize: 24,
    fontFamily: "Rubik-ExtraBold",
  },
  rowGap3: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E6F0FF",
    borderRadius: 999,
  },
  typeBadgeText: {
    fontSize: 12,
    color: "#0061FF",
    fontFamily: "Rubik-Bold",
  },
  rowGap2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingText: {
    color: "#A0A3BD",
    fontSize: 14,
    marginTop: 4,
    fontFamily: "Rubik-Medium",
  },
  bedBathAreaWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  featureIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: {
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    color: "#191D31",
    marginLeft: 8,
  },
  agentSection: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Rubik-Bold",
    marginBottom: 16,
  },
  rowBetweenMarginTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  agentImage: {
    width: 52,
    height: 52,
    borderRadius: 999,
  },
  agentInfo: {
    marginLeft: 12,
  },
  agentName: {
    fontSize: 14,
    fontFamily: "Rubik-Bold",
    color: "#191D31",
  },
  agentEmail: {
    fontSize: 12,
    fontFamily: "Rubik-Medium",
    color: "#A0A3BD",
  },
  overviewSection: {
    marginTop: 28,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#A0A3BD",
    marginTop: 8,
    lineHeight: 20,
  },
  facilitiesSection: {
    marginTop: 28,
  },
  facilitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    gap: 12,
  },
  facilityItem: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  facilityIcon: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#F5F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  facilityText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Rubik-Medium",
    color: "#191D31",
  },
  gallerySection: {
    marginTop: 28,
  },
  galleryImage: {
    width: 160,
    height: 120,
    borderRadius: 16,
    marginRight: 12,
  },
  locationSection: {
    marginTop: 28,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    color: "#191D31",
    flex: 1,
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginTop: 16,
  },
  reviewsSection: {
    marginTop: 28,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewsHeaderText: {
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    color: "#191D31",
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: "Rubik-Bold",
    color: "#0061FF",
  },
  commentSection: {
    marginTop: 16,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomPrice: {
    gap: 4,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    color: "#A0A3BD",
  },
  priceText: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    color: "#191D31",
    maxWidth: 140,
  },
  bookNowButton: {
    backgroundColor: "#0061FF",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 999,
  },
  bookNowText: {
    fontSize: 14,
    fontFamily: "Rubik-Bold",
    color: "white",
  },
  iconSize4: {
    width: 16,
    height: 16,
  },
  iconSize5: {
    width: 20,
    height: 20,
  },
  iconSize6: {
    width: 24,
    height: 24,
  },
  iconSize7: {
    width: 28,
    height: 28,
  },
});

export default Property;
