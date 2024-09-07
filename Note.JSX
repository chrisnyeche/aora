import React, { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

const MyList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const DATA = [{ id: '1', title: 'Item 1' }, { id: '2', title: 'Item 2' }];

  const onRefresh = async () => {
    setRefreshing(true); // Show the spinner
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate fetching data
    setRefreshing(false); // Hide the spinner after refresh
  };

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
        </View>
      )}
      // Adding the RefreshControl
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};

export default MyList;
