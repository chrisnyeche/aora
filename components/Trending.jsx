import React, { useState } from "react";
import { View, FlatList, ImageBackground, Text, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { useCarousel, zoomIn, zoomOut } from "./UseCarousel";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View>
          <Video
            source={{ uri: item.video }}
            className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
            resizeMode={ResizeMode.COVER}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) setPlay(false);
            }} //
          />
        </View>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  // Check if posts.documents exists before rendering the FlatList
  if (!posts || !posts.documents || posts.documents.length === 0) {
    return <Text>Loading...</Text>; // Or handle empty state
  }
  const { activeItem, viewableItemsChanged, viewabilityConfig, flatListRef } = useCarousel(
    posts.documents
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={posts.documents}
        horizontal
        keyExtractor={(item) => item?.$id || item.id} // Make sure item exists and fallback if needed
        renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentOffset={{ x: 170 }}
      />
    </View>
  );
};

export default Trending;
