import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";

interface InfoBlockProps {
  title: string;
  address: string;
  price: string;
  infoBlockStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  addressStyle?: StyleProp<TextStyle>;
  priceStyle?: StyleProp<TextStyle>;
  heartIconStyle?: StyleProp<ImageStyle>;
}

const RatingBadge = () => (
  <View style={styles.ratingBadge}>
    <Image source={icons.star} style={{ height: 15, width: 15 }} />
    <Text style={styles.ratingText}>4.4</Text>
  </View>
);

const InfoBlock = ({
  title,
  address,
  price,
  infoBlockStyle,
  titleStyle,
  addressStyle,
  priceStyle,
  heartIconStyle,
}: InfoBlockProps) => (
  <View style={[styles.infoBlock, infoBlockStyle]}>
    <Text numberOfLines={1} style={[styles.titleText, titleStyle]}>
      {title}
    </Text>
    <Text style={[styles.addressText, addressStyle]}>{address}</Text>
    <View style={styles.priceContainer}>
      <Text style={[styles.priceText, priceStyle]}>{price}</Text>
      <Image source={icons.heart} style={[styles.heartIcon, heartIconStyle]} />
    </View>
  </View>
);

interface CardProps {
  onPress?: () => void;
  image: ImageSourcePropType;
  title: string;
  address: string;
  price: string;
  imageStyle?: StyleProp<ImageStyle>;
  infoBlockStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  addressStyle?: StyleProp<TextStyle>;
  priceStyle?: StyleProp<TextStyle>;
  heartIconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  ratingWrapperStyle?: StyleProp<ViewStyle>; // ✅ New prop for badge positioning
}

export const FeaturedCard = ({
  onPress,
  image,
  title,
  address,
  price,
  imageStyle,
  infoBlockStyle,
  titleStyle,
  addressStyle,
  priceStyle,
  heartIconStyle,
  ratingWrapperStyle,
}: CardProps) => (
  <TouchableOpacity onPress={onPress} style={styles.featuredCardContainer}>
    <View style={{ position: "relative", width: 190, height: 260 }}>
      <Image
        source={image}
        resizeMode="cover"
        style={[styles.backgroundImage, imageStyle]}
      />
      <Image
        source={require("@/assets/images/card-gradient.png")}
        style={styles.overlayImage}
      />
      <View style={[styles.featuredRatingWrapper, ratingWrapperStyle]}>
        <RatingBadge />
      </View>
      <InfoBlock
        title={title}
        address={address}
        price={price}
        infoBlockStyle={[
          { position: "absolute", bottom: 16, left: 12 },
          infoBlockStyle,
        ]}
        titleStyle={titleStyle}
        addressStyle={addressStyle}
        priceStyle={priceStyle}
        heartIconStyle={heartIconStyle}
      />
    </View>
  </TouchableOpacity>
);

export const Card = ({
  onPress,
  image,
  title,
  address,
  price,
  imageStyle,
  infoBlockStyle,
  titleStyle,
  addressStyle,
  priceStyle,
  heartIconStyle,
  containerStyle,
  ratingWrapperStyle,
}: CardProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.shadowBox, containerStyle]}
  >
    <View
      style={{ position: "relative", overflow: "hidden", borderRadius: 16 }}
    >
      <Image source={image} style={[styles.cardImage, imageStyle]} />
      <View style={[styles.cardRatingWrapper, ratingWrapperStyle]}>
        <RatingBadge />
      </View>
      <InfoBlock
        title={title}
        address={address}
        price={price}
        infoBlockStyle={[
          { position: "relative", bottom: 12, left: 10 },
          infoBlockStyle,
        ]}
        titleStyle={titleStyle}
        addressStyle={addressStyle}
        priceStyle={priceStyle}
        heartIconStyle={heartIconStyle}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  featuredCardContainer: {
    display: "flex",
    flexDirection: "column",
  },
  backgroundImage: {
    position: "absolute",
    height: 260,
    width: 190,
    borderRadius: 16,
  },
  overlayImage: {
    height: 260,
    width: 190,
    borderRadius: 16,
  },
  featuredRatingWrapper: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  shadowBox: {
    flex: 1,
    width: "100%",
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 60,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 6,
    elevation: 6,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    bottom: 40,
  },
  // cardRatingWrapper: {
  //   position: "absolute",
  //   top: 10,
  //   right: 10,
  //   zIndex: 1,
  // },

  cardRatingWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 16,
  },
  ratingText: {
    fontFamily: "Rubik_700Bold",
    fontSize: 11,
    color: "#0061FF",
  },
  infoBlock: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
    zIndex: 1,
  },

  titleText: {
    fontSize: 16,
    fontFamily: "Rubik_800ExtraBold",
    color: "white",
  },
  addressText: {
    fontSize: 10,
    fontFamily: "Rubik_300Light",
    color: "white",
    marginTop: 3,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  priceText: {
    fontFamily: "Rubik_800ExtraBold",
    fontSize: 16,
    color: "white",
  },
  heartIcon: {
    height: 22,
    width: 22,
    marginLeft: 60,
  },
});
