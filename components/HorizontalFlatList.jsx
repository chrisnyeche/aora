import React, { useRef } from "react";
import { Animated, FlatList, Text, View } from "react-native";

const data = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  { id: "4", title: "Item 4" },
  { id: "5", title: "Item 5" },
];

const AnimatedFlatList = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    // Item Size and Spacing
    const ITEM_SIZE = 120;
    const SPACING = 20;

    const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8], // Scaling the item in the center
      extrapolate: "clamp",
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [20, 0, 20], // Slight vertical movement as items come into view
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          transform: [{ scale }, { translateY }],
          marginHorizontal: SPACING / 2,
        }}
      >
        <View
          style={{
            backgroundColor: "lightblue",
            height: 100,
            width: ITEM_SIZE,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        snapToInterval={120} // Ensures the list snaps to each item
        decelerationRate="fast" // For fast and smooth scroll
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
      />
    </View>
  );
};

export default AnimatedFlatList;
