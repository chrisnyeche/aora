import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";

import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery) || "";

  return (
    <View className="w-full h-16 px-4 bg-black-200 rounded-2xl border-2 border-black-100 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        // {...props}
        className="text -base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      {/* Search icon */}
      <TouchableOpacity
        onPress={() => {
          if (query === "") {
            return Alert.alert("missing query", "Please enter a query to search for");
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else {
            router.push(`/search/${query}`); // navigate to search page
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMethod="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
