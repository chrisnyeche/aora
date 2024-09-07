import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

import { icons } from "../constants";

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className="w-full h-16 px-4 bg-black-200 rounded-2xl border-2 border-black-100 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        // {...props}
        className="text -base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7B8B"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />

      {/* Search icon */}
      <TouchableOpacity onPress={() => {}}>
        <Image source={icons.search} className="w-5 h-5" resizeMethod="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
