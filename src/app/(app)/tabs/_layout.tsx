import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@utils/colors";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Головна",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="home"
              color={focused ? Colors.purple : Colors.lightGray}
              size={size}
            />
          ),
          tabBarActiveTintColor: Colors.purple,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профіль",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={focused ? Colors.purple : Colors.lightGray}
            />
          ),
          tabBarActiveTintColor: Colors.purple,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
