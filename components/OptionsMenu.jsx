import { Modal, View, Text, TouchableOpacity } from "react-native";

const OptionsMenu = ({ isVisible, onClose, onBookmark, onDelete, buttonLayout }) => {
  if (!buttonLayout) return null;

  const { x, y, width, height } = buttonLayout;
  const modalPosition = {
    top: y + height + 200, // 10 pixels below the button
    left: x + width - 100, // Align right edge of modal with button
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <TouchableOpacity className="flex-1" onPress={onClose}>
        <View
          style={{
            position: "absolute",
            top: modalPosition.top,
            left: modalPosition.left,
            width: 100,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <TouchableOpacity onPress={onBookmark}>
            <Text className="text-lg mb-4 font-pmedium">Bookmark</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text className="text-lg text-red-500 font-pmedium">Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default OptionsMenu;
