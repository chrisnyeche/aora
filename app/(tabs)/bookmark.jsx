import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import EmptyState from "./../../components/EmptyState";
import { getUserPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "./../../context/GlobalProvider";
import { LoadingAlert } from "../../components/SweetAlert";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView className="bg-primary h-full" style={{ backgroundColor: "#161622" }}>
      <View className="justify-center h-full w-full">
        <EmptyState title={"Coming Soon"} subtitle={"Get ready for this feature"} />
      </View>

      <LoadingAlert isVisible={isModalVisible} message="Signing Out" loading={true} />
    </SafeAreaView>
  );
};

export default Bookmark;
