import { View, Text } from "react-native";
import React from "react";

const ButtonCheck = () => {
  return (
    <View>
      <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
        Already have an account? <Text className="text-secondary-200">Sign Up</Text>
      </Text>
    </View>
  );
};

export default ButtonCheck;
