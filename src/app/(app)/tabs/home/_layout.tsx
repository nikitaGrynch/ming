import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="advts" />
    </Stack>
  );
};

export default HomeLayout;
