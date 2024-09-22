import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import EmptyState from "./../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "./../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "./../../components/InfoBox";
import { router } from "expo-router";
import { LoadingAlert } from "../../components/SweetAlert";
import SearchInput from "../../components/SearchInput";

const Bookmark = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="items-center justify-center mt-12 mb-12 px-4">
            <SearchInput placeholder={"Search for a Video topic"} />
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

export default Bookmark;
