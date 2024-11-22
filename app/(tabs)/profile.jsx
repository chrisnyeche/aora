import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import EmptyState from "./../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "./../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "./../../components/InfoBox";
import { router } from "expo-router";
import { LoadingAlert } from "../../components/SweetAlert";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  // Logout implementation
  const logout = async () => {
    try {
      setIsModalVisible(true);
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsModalVisible(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full" style={{ backgroundColor: "#161622" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="items-center justify-center mt-12 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox title={user?.username} containerStyles={"mt-5"} titleStyles={"text-lg"} />

            <View className="flex-row mt-5">
              <InfoBox
                title={posts.length || 0}
                containerStyles={"mr-10"}
                titleStyles={"text-xl"}
                subtitle={"Posts"}
              />
              <InfoBox title={"1.2k"} subtitle={"Followers"} titleStyles={"text-xl"} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title={"No Videos Found"} subtitle={"No Videos found for this search"} />
        )}
      />

      <LoadingAlert isVisible={isModalVisible} message="Signing Out" loading={true} />
    </SafeAreaView>
  );
};

export default Profile;
