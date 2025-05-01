import { View, Text, Image, StyleSheet } from "react-native";

import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <Text style={styles.review}>{item.review}</Text>

      <View style={styles.footerRow}>
        <View style={styles.likesRow}>
          <Image
            source={icons.heart}
            style={styles.likeIcon}
            tintColor="#0061FF"
          />
          <Text style={styles.likesCount}>120</Text>
        </View>
        <Text style={styles.date}>
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56, // size-14 (14 * 4 = 56px)
    height: 56,
    borderRadius: 56 / 2, // rounded-full
  },
  name: {
    fontSize: 16, // text-base
    color: "#A1A1AA", // text-black-300 (you can replace with your exact color)
    textAlign: "left",
    fontFamily: "Rubik-Bold", // font-rubik-bold
    marginLeft: 12, // ml-3 (3 * 4)
  },
  review: {
    color: "#D4D4D8", // text-black-200
    fontSize: 16, // text-base
    fontFamily: "Rubik", // font-rubik
    marginTop: 8, // mt-2 (2 * 4)
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 16, // mt-4 (4 * 4)
  },
  likesRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeIcon: {
    width: 20, // size-5 (5 * 4)
    height: 20,
  },
  likesCount: {
    color: "#A1A1AA", // text-black-300
    fontSize: 14, // text-sm
    fontFamily: "Rubik-Medium", // font-rubik-medium
    marginLeft: 8, // ml-2 (2 * 4)
  },
  date: {
    color: "#71717A", // text-black-100
    fontSize: 14, // text-sm
    fontFamily: "Rubik", // font-rubik
  },
});
