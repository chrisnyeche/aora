import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";

const Home = () => {
  const DATA = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    // Add more items as needed
  ];
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Text className="text-3xl">{item.title}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>My List Header</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.footerText}>My List Footer</Text>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Home;

const styles = {
  header: {
    backgroundColor: "#f1f1f1",
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    backgroundColor: "#f1f1f1",
    padding: 20,
  },
  footerText: {
    fontWeight: "bold",
    color: "#333",
  },
};
