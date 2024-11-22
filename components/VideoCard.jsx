import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { icons } from "../constants";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import OptionsMenu from "./OptionsMenu";
import { deleteVideo, getAllPosts } from "../lib/appwrite";
import ErrorModal from "./ErrorModal";
import { ConfirmationAlert } from "./SweetAlert";
import useAppwrite from "../lib/useAppwrite";

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [isConfirmAlertVisible, setConfirmAlertVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(null);
  const { data: posts, refetch } = useAppwrite(getAllPosts);
 
  // Pull to refresh
  const [refreshing, setRefreshing] = useState(false);
  const Refresh = async () => {
    setRefreshing(true); // Shows the loading spinner
    await refetch();
    setRefreshing(false); // Hides the loading spinner
  };

  const handleBookmark = () => {
    // Handle bookmarking logic here
    Alert.alert("Coming Soon", "Get ready for this feature");
    // console.log("Bookmark clicked for video", title);
    setIsOptionsVisible(false);
  };

  const handleDeleteVideo = async (documentId) => {
    try {
      await deleteVideo(documentId);
      Refresh();
    } catch (error) {
      setErrorMessage(error.message);
      setErrorModalVisible(true);
    }
  };

  // Function that opens the confirmation modal
  const confirmDeleteVideo = () => {
    setIsOptionsVisible(false); // Close the options menu
    setConfirmAlertVisible(true); // Show the confirmation alert
  };

  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      {/* Elements */}
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-sm font-psemibold text-gray-100" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular">{username}</Text>
          </View>

          <View
            className="pt-2"
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              setButtonLayout(layout);
            }}
          >
            <TouchableOpacity onPress={() => setIsOptionsVisible(true)}>
              <Image source={icons.menu} className="h-5 w-5" resizeMode="contain" />
            </TouchableOpacity>
          </View>

          {/* Options Menu */}
          <OptionsMenu
            isVisible={isOptionsVisible}
            onClose={() => setIsOptionsVisible(false)}
            onBookmark={handleBookmark}
            onDelete={() => confirmDeleteVideo()}
            buttonLayout={buttonLayout}
          />
        </View>
      </View>
      {play ? (
        <View>
          <Video
            source={{ uri: video }}
            className="w-72 h-72 rounded-[35px] mt-3 bg-white/10"
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
          className="w-full h-60 rounded-xl relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}

      {/* Confirmation Alert */}
      <ConfirmationAlert
        isVisible={isConfirmAlertVisible}
        onCancel={() => setConfirmAlertVisible(false)} // Close modal if canceled
        onConfirm={() => {
          setConfirmAlertVisible(false); // Close modal after confirming
          handleDeleteVideo(video.$id); // Now execute the delete action
        }}
      />

      {/* Error Modal */}
      <ErrorModal
        isVisible={isErrorModalVisible}
        errorMessage={errorMessage}
        onClose={() => setErrorModalVisible(false)}
      />
    </View>
  );
};

export default VideoCard;
