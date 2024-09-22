import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";

export const LoadingAlert = ({ isVisible, message, onConfirm, onCancel, loading }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7}>
      <View className="justify-center items-center bg-white p-5 rounded-lg">
        <Text className="text-lg font-bold mb-4">{message}</Text>

        {/* Show loading indicator if 'loading' prop is true */}
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-2">Please wait...</Text>
          </>
        ) : (
          <View className="flex-row space-x-4">
            {/* Confirm Button */}
            <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-md" onPress={onConfirm}>
              <Text className="text-white">Confirm</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity className="bg-gray-400 px-4 py-2 rounded-md" onPress={onCancel}>
              <Text className="text-white">Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export const ConfirmationAlert = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center">
        <View className="bg-white p-6 rounded-lg w-4/5">
          <Text className="text-lg font-semibold text-gray-800 mb-4 font-pmedium">
            Are you sure you want to delete this video?
          </Text>
          <View className="flex-row justify-around mt-4">
            <TouchableOpacity className="bg-red-500 py-2 px-4 rounded" onPress={onConfirm}>
              <Text className="text-white text-center font-pregular">Yes, Proceed</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-500 py-2 px-4 rounded" onPress={onCancel}>
              <Text className="text-white text-center font-pregular">No, Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
