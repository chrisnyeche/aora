import { View, Text, SafeAreaView, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "./../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  // Fetch data from Appwrite API
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const { user } = useGlobalContext();

  // Pull to refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true); // Shows the loading spinner
    await refetch();
    setRefreshing(false); // Hides the loading spinner
  };
  // console.log(posts);
  return (
    <SafeAreaView className="bg-primary h-full" style={{ backgroundColor: "#161622" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 mt-20">
            <View className="justify-between items-start flex-row mb-6">
              {/* Title Heading */}
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="font-psemibold text-2xl text-white">{user?.username}</Text>
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

            <Trending posts={latestPosts ?? []} />
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
