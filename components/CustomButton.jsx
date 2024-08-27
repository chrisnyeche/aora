import { View, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress} // handlePress is a function that will be passed as a prop to the CustomButton component
      activeOpacity={0.7}
      className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
