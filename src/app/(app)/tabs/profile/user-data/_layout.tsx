import React from "react";
import { Stack } from "expo-router";

const UserDataLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="edit-user"
        options={{
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
};

export default UserDataLayout;
