import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "./../../components/CustomButton";
import { Link, useRouter } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { LoadingAlert } from "../../components/SweetAlert";
import ErrorModal from "../../components/ErrorModal";

const SignIn = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const router = useRouter();

  const [Form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!Form.email || !Form.password) {
      setErrorMessage("Please fill in all fields");
      setIsErrorModalVisible(true);
      return; // Stop further execution
    }

    setisSubmitting(true);
    setIsModalVisible(true); // Show modal

    try {
      await signIn(Form.email, Form.password);
      const result = await getCurrentUser();

      if (result) {
        setUser(result);
        setIsLoggedIn(true);
        router.replace("/home");
      } else {
        throw new Error("User could not be authenticated");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setIsErrorModalVisible(true);
    } finally {
      setisSubmitting(false);
      setIsModalVisible(false); // Hide modal
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
          <ErrorModal
            isVisible={isErrorModalVisible}
            message={errorMessage}
            onClose={() => setIsErrorModalVisible(false)}
          />
          <LoadingAlert isVisible={isModalVisible} message="Signing in" loading={isSubmitting} />
        </View>
        <StatusBar style="light" backgroundColor="#161622" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
