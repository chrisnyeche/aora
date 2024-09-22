import { Image, SafeAreaView, ScrollView, StatusBar, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "./../../components/CustomButton";
import { Link, useRouter } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { LoadingAlert } from "../../components/SweetAlert";
import ErrorModal from "../../components/ErrorModal";

const SignUp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const router = useRouter();

  const [Form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submit = async () => {
    if (!Form.username || !Form.email || !Form.password) {
      setErrorMessage("Please fill in all fields");
      setIsErrorModalVisible(true);
      return; // Stop further execution
    }

    if (!emailRegex.test(Form.email)) {
      setErrorMessage("Please enter a valid email address");
      setIsErrorModalVisible(true);
      return; // Stop further execution
    }

    setIsSubmitting(true); // Show loading state
    setIsModalVisible(true); // Show modal

    try {
      const result = await createUser(Form.email, Form.password, Form.username);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home"); // Redirect to the home page
    } catch (error) {
      setErrorMessage(error.message);
      setIsErrorModalVisible(true);
    } finally {
      setIsSubmitting(false); // End loading state
      setIsModalVisible(false); // Hide modal
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full px-4 min-h-[75vh] mt-32">
          <Image source={images.logo} resizeMode="contain" className="h-[35px] w-[115px]" />
          <Text className="font-psemibold text-2xl text-white mt-10">Sign up to Aora</Text>
          <FormField
            title="Username"
            value={Form.username}
            otherStyles="mt-7"
            handleChangeText={(e) => setForm({ ...Form, username: e })} // This is the change event handler for the username field
          />
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
            title="Sign Up"
            containerStyles={"w-full mt-7"}
            handlePress={() => submit()}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row">
            <Text className="text-lg text-gray-100 font-pregular"> Have an account already? </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary-100">
              {" "}
              Sign In
            </Link>
          </View>
          <ErrorModal
            isVisible={isErrorModalVisible}
            message={errorMessage}
            onClose={() => setIsErrorModalVisible(false)}
          />
          <LoadingAlert isVisible={isModalVisible} message="Signing Up" loading={isSubmitting} />
        </View>
        <StatusBar style="light" backgroundColor="#161622" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
