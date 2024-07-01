import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="user-data" />
      <Stack.Screen name="advts" />
      <Stack.Screen name="resumes" />
      <Stack.Screen name="saved/advts" />
    </Stack>
  );
};

export default ProfileLayout;
