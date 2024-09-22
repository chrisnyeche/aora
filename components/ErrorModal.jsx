import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const ErrorModal = ({ isVisible, message, onClose }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7}>
      <View className="bg-white p-5 rounded-xl items-center">
        <Text className="text-xl font-pextrabold text-red-600 mb-4">Error</Text>
        <Text className="text-center text-gray-600 font-pmedium">{message}</Text>

        <TouchableOpacity onPress={onClose} className="bg-red-500 mt-5 px-4 py-2 rounded-md">
          <Text className="text-white font-pregular">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ErrorModal;
