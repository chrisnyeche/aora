import { Image, SafeAreaView, ScrollView, StatusBar, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "./../../components/CustomButton";
import { Link, useRouter } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const submit = async () => {
    if (!Form.email || !Form.password) {
      Alert.alert(Error, "Please fill in all fields"); // This is the error message for the user
      setisSubmitting(true); // This is the loading state for the user
    } else {
      try {
        await signIn(Form.email, Form.password,);
        router.replace("/home"); // This is the redirect to the home page
      } catch (error) {
        Alert.alert("error", error.message); // This is the error message for the user
      } finally {
        setisSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full px-4 min-h-[75vh] mt-32">
          <Image source={images.logo} resizeMode="contain" className="h-[35px] w-[115px]" />
          <Text className="font-psemibold text-2xl text-white mt-10">Log In to Aora</Text>
          <FormField
            title="Email"
            value={Form.email}
            otherStyles="mt-7"
            handleChangeText={(e) => setForm({ ...Form, email: e })} // This is the change event handler for the email field
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={Form.password}
            otherStyles="mt-7"
            handleChangeText={(e) => setForm({ ...Form, password: e })} // This is the change event handler for the password field
          />
          <CustomButton
            title="Sign in"
            containerStyles={"w-full mt-7"}
            handlePress={() => submit()}
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


