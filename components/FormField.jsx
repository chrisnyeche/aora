import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {/* Label */}
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      {/* Input */}
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-100 focus:border-secondary items-center flex-row">
        <TextInput
          {...props}
          className="text -base mt-0.5 text-white flex-1 font-psemibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {/* Show Password Toggle */}
        {title === "Password" && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
