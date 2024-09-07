import { View, Text, FlatList } from "react-native";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id} // key extractor
      horizontal // horizontal scrolling
      renderItem=
      {({ item }) => (
        <View>
          <Text className="text-2xl text-white">{item.id}</Text>
        </View>
      )}>
      <Text> I am</Text>
    </FlatList>
  );
};

export default Trending;
