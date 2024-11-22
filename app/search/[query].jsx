import { View, Text, SafeAreaView, FlatList, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import EmptyState from "./../../components/EmptyState";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  // Fetch data from Appwrite API
  const { query } = useLocalSearchParams(); // use local search params
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch;
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full" style={{ backgroundColor: "#161622" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 mt-20">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
            <Text className="font-psemibold text-2xl text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
            <View>
              <Text className="text-lg font-pregular text-gray-100 mb-3">Latest Videos </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title={"No Videos Found"} subtitle={"No Videos found for this search"} />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
