import { Text, View, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { Dimensions } from "react-native";

const App = () => {
  console.log(Dimensions.get("window").height);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100vh" }}>
        <View className={`w-full justify-center items-center px-4`}>
          <Image source={images.logo} resizeMode="contain" className="w-40 h-40" />
          <Image source={images.cards} resizeMode="contain" className="w-70 h-60" />

          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-white text-center">
              Discover Endless Possibiities with
              <Text className="text-secondary-200"> Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless exploration with
            Aora
          </Text>
          <CustomButton
            title="Continue With Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles={"w-full mt-7"}
          />
        </View>
        <StatusBar style="light" backgroundColor="#161622" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

