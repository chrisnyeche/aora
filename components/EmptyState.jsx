import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center px-4">
      {/* Find Icon Image */}
      <Image source={images.empty} resizeMode="contain" className="w-[270px] h-[216px]" />

      {/* Empty State text */}
      <View className="flex items-center justify-center">
        <Text className="text-xl font-psemibold text-white">{title}</Text>
        <Text className="text-xl text-center font-psemibold text-white mt-2">{subtitle}</Text>
      </View>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
