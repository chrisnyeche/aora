import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-red-400 text-3xl font-pblack">I love you so much</Text>
      <Link href={"/(tabs)"} className="text-2xl text-blue-600">
        Click Me
      </Link>
    </View>
  );
};

export default App;
