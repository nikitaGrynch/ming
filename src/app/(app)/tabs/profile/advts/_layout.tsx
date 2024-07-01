import React from "react";
import { Stack } from "expo-router";

const AdvtsProfileLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="add-advt"
        options={{
          presentation: "fullScreenModal",
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
};

export default AdvtsProfileLayout;
