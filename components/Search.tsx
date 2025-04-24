import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDebounce } from "use-debounce";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);
  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };
  return (
    <View style={styles.searchContaier}>
      <View style={styles.searchBox}>
        <Image source={icons.search} style={styles.SearchIcon} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          style={styles.SearchStyle}
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContaier: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "100%",
    borderRadius: 50,
    backgroundColor: "#FBFBFD",
    borderColor: "#0061FF0A",
    borderWidth: 5,
    paddingBlock: 3,
    marginTop: 10,
  },
  SearchIcon: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  searchBox: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  SearchStyle: {
    flex: 1,
    marginLeft: 2,
    color: "#0061FF",
    fontFamily: "Rubik_400Regular",
  },
  filterIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
});
