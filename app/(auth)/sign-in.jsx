import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "./../../components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="my-6 px-4 w-full h-[75vh] mt-32">
          <Image source={images.logo} resizeMode="contain" className="h-[35px] w-[115px]" />
          <Text className="font-psemibold text-2xl text-white mt-10">Log In to Aora</Text>
          <FormField title="Email" value={Form.email} otherStyles="mt-7" />
          <FormField
            title="Password"
            value={Form.password}
            otherStyles="mt-7"
            onChangeText={(e) => setForm({ ...form, password: e })} // This is the change event handler for the password field
          />
          <CustomButton
            title="Sign in"
            containerStyles={"w-full mt-7"}
            handlePress={submit()}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row">
            <Text className="text-lg text-gray-100 font-pregular"> Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary-100">
              {" "}
              Sign Up
            </Link>
          </View>
        </View>
        <StatusBar style="light" backgroundColor="#161622" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
