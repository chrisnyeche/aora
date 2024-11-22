import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Video, ResizeMode } from "expo-av";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from "./../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import ErrorModal from "../../components/ErrorModal";
import { LoadingAlert } from "../../components/SweetAlert";

const Create = () => {
  const { user } = useGlobalContext();
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isVideoTooLarge = (video) => video && video.size > 10 * 1024 * 1024;
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    video: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg", "image/gif"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    }
  };

  const submit = async () => {
    if (form.title === "" || form.prompt === "" || form.video === null || form.thumbnail === "") {
      setErrorMessage("Please fill in all fields");
      setIsErrorModalVisible(true);
      return;
    }

    // Check if video size exceeds 10MB
    if (isVideoTooLarge(form.video)) {
      setErrorMessage("Video size exceeds 10MB. Please upload a smaller file.");
      setIsErrorModalVisible(true);
      return;
    }

    setUploading(true);
    try {
      // Then save the video details to your Appwrite database
      await createVideo({
        ...form,
        userId: user.$id,
      });

      // For demonstration purposes, let's simulate the upload process
      setTimeout(() => {
        Alert.alert("Video uploaded", "Your video has been successfully uploaded.");
        router.push("home"); // Redirect to home
      }, 2000);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        description: "",
        thumbnail: null,
        video: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full" style={{ backgroundColor: "#161622" }}>
      <ScrollView className="px-4 my-10">
        <Text className="text-2xl text-white font-psemibold"> Upload Video </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder={"Give your video a catchy title"}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={"mt-10"}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium"> Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="`w-full h-40 px-4 bg-black-100 rounded-2xl"
                ResizeMode={ResizeMode.COVER}
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center text-center">
                <View className="w-14 h-14 border-dashed border border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} ResizeMode="cover" className="w-6 h-6" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium"> Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="`w-full h-40 px-4 bg-black-100 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 border-dashed justify-center items-center border border-black-200 flex-row space-x-2">
                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" />
                <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder={"Give your video a catchy prompt"}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-10"}
        />

        <CustomButton
          title={"Submit & Publish"}
          handlePress={submit}
          containerStyles={"mt-7"}
          isLoading={uploading}
        />

        {/* Sweet Alert modal for uploading */}
        <LoadingAlert isVisible={uploading} message="Uploading..." />

        {/* Error Modal for file size or missing field errors */}
        <ErrorModal
          isVisible={isErrorModalVisible}
          message={errorMessage}
          onClose={() => setIsErrorModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
