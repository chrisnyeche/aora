import { useState, useRef } from "react";

// useCarousel Hook: A custom hook to manage carousel-like functionality for FlatLists in React Native.
// Parameters:
// - data: An array of items that will be used in the carousel (defaults to an empty array).
// - viewabilityThreshold: A percentage (0-100) indicating how much of an item needs to be visible to trigger the viewability event (defaults to 70%).
// - initialActiveIndex: The initial item to be considered as the "active" item (defaults to 0).

export const useCarousel = (data = [], viewabilityThreshold = 70, initialActiveIndex = 0) => {
  // activeItem: This state stores the ID of the currently "active" item in the carousel.
  // The active item is initially set to the item at `initialActiveIndex` or null if data is empty.

  const [activeItem, setActiveItem] = useState(data[initialActiveIndex]?.$id || null);

  // flatListRef: A ref for controlling the FlatList programmatically (e.g., scrolling).
  const flatListRef = useRef(null);

  // viewableItemsChanged: This function is triggered when the set of viewable items in the FlatList changes.
  // It updates the active item based on the first visible item from the viewableItems array.
  const viewableItemsChanged = ({ viewableItems }) => {
    // Ensure that the viewableItems array has at least one item and the item's ID exists.
    if (viewableItems.length > 0 && viewableItems[0]?.item?.$id) {
      setActiveItem(viewableItems[0].item.$id); // Set the active item to the first visible item's ID.
    }
  };

  // viewabilityConfig: This config determines when an item is considered "visible."
  // The itemVisiblePercentThreshold controls the percentage of an item that must be visible to trigger the event.
  const viewabilityConfig = {
    itemVisiblePercentThreshold: viewabilityThreshold, // Defaults to 70% visibility.
  };

  // The hook returns:
  // - activeItem: The currently active item's ID.
  // - flatListRef: A ref for the FlatList, allowing for programmatic control.
  // - viewableItemsChanged: A callback to be used in FlatList's `onViewableItemsChanged` prop.
  // - viewabilityConfig: Configuration for when an item is considered "viewable."
  return {
    activeItem,
    flatListRef,
    viewableItemsChanged,
    viewabilityConfig,
  };
};

// zoomIn: Animation keyframes for zooming in when an item becomes active.
// - Starts at a scale of 0.9 and animates to 1.1, giving a zoom-in effect.
export const zoomIn = {
  0: {
    scale: 0.9, // Initial scale (90% size).
  },
  1: {
    scale: 1.1, // Final scale (110% size).
  },
};

// zoomOut: Animation keyframes for zooming out when an item becomes inactive.
// - Starts at a scale of 1 (normal size) and animates to 0.9, giving a zoom-out effect.
export const zoomOut = {
  0: {
    scale: 1, // Initial scale (100% size).
  },
  1: {
    scale: 0.9, // Final scale (90% size).
  },
};
