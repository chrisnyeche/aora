import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";

import { icons } from "../../constants";

// Create Tab Icon function
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center'>
      <Image
        source={icon}
        style={{ width: 24, height: 24, tintColor: color }}
        resizeMode="contain"
        tintColor={color}
        // className="w-10 h-10"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text> 
    </View>
  );
};

const TabsLayout = () => {
  return (
      <Tabs screenOptions={{
        tabBarShowLabel: false, //remove the tab label
        tabBarActiveTintColor: '#FFA001', //add the active tint color to the tab bar icon
        tabBarLabelcolor: '#FFA001', //add the tab label color with
        tabBarInactiveTintColor: '#CDCDE0', //add the inactive tint color to the tab bar icon
        tabBarStyle:{
          backgroundColor: '#161622', //add the background color to the tab bar
          borderTopWidth: 1, //add the border top width to the tab bar
          height: 60, //add the height of the tab bar
          borderTopColor: '#232533', // add the border top color to the tab bar
        }
      }}> 
      {/* Home Screen */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
            ),
          }}    
        />
        {/* Bookmark Screen */}
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused} />
            ),
          }}    
        />
        {/* Create Screen */}
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
            ),
          }}    
        />
        {/* Profile Screen */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
            ),
          }}    
        />
      </Tabs> 
  );
};

export default TabsLayout;
