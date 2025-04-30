import icons from "@/constants/icons";
import images from "@/constants/images";
import {
  Rubik_500Medium,
  Rubik_700Bold,
  Rubik_800ExtraBold,
} from "@expo-google-fonts/rubik";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.featuredCard}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <Image source={images.cardGradient} style={styles.gradientOverlay} />

      <View style={styles.ratingBadge}>
        <Image source={icons.star} style={styles.starIcon} />
        <Text style={styles.ratingText}>4.4</Text>
      </View>

      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle} numberOfLines={1}>
          Modern Apartment
        </Text>
        <Text style={styles.featuredAddress}>22 W 15th St, New York</Text>
        <View style={styles.priceRow}>
          <Text style={styles.featuredPrice}>$2,500</Text>
          <Image source={icons.heart} style={styles.heartIconWhite} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.ratingBadgeCard}>
        <Image source={icons.star} style={styles.starIconSmall} />
        <Text style={styles.ratingText}>4.4</Text>
      </View>

      <Image source={images.newYork} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Cozy Studio</Text>
        <Text style={styles.cardAddress}>22 W 15th St, New York</Text>
        <View style={styles.priceRow}>
          <Text style={styles.cardPrice}>$2,500</Text>
          <Image source={icons.heart} style={styles.heartIconDark} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const baseText = {
  fontFamily: "Rubik_700Bold",
  color: "#191d31",
};

const styles = StyleSheet.create({
  featuredCard: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: 240,
    height: 320,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  gradientOverlay: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    position: "absolute",
    bottom: 0,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    position: "absolute",
    top: 20,
    right: 20,
  },
  ratingBadgeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 9999,
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 50,
  },
  starIcon: {
    height: 20,
    width: 20,
  },
  starIconSmall: {
    height: 16,
    width: 16,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "Rubik_700Bold",
    marginLeft: 4,
  },
  featuredContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontFamily: "Rubik_800ExtraBold",
    color: "#ffffff",
  },
  featuredAddress: {
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
    color: "#ffffff",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 4,
  },
  featuredPrice: {
    fontSize: 20,
    fontFamily: "Rubik_800ExtraBold",
    color: "#ffffff",
  },
  heartIconWhite: {
    width: 20,
    height: 20,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    // elevation: 10,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: "column",
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Rubik_700Bold",
    color: "#191d31",
  },
  cardAddress: {
    fontSize: 12,
    fontFamily: "Rubik_500Medium",
    color: "#666876",
  },
  cardPrice: {
    fontSize: 16,
    fontFamily: "Rubik_700Bold",
    color: "#0061FF",
  },
  heartIconDark: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#191d31",
  },
});
