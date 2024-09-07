import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControlComponent,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "./../../components/EmptyState";
import { RefreshControl } from "react-native";
import { getAllPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(() => getAllPosts());
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true); // Shows the loading spinner
    await refetch();
    setRefreshing(false); // Hides the loading spinner
  };
  // console.log(posts);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 mt-20">
            <View className="justify-between items-start flex-row mb-6">
              {/* Title Heading */}
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="font-psemibold text-2xl text-white">Chris</Text>
              </View>
              {/* Logo */}
              <View className="mt-1.5">
                <Image source={images.logoSmall} resizeMethod="contain" className="w-9 h-10" />
              </View>
            </View>

            <SearchInput placeholder={"Search for a Video topic"} />
            <View>
              <Text className="text-lg font-pregular text-gray-100 mb-3">Latest Videos </Text>
            </View>

            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title={"No Videos Found"} subtitle={"Be the first to upload video"} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
