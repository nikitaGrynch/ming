import React from "react";
import { Stack } from "expo-router";

const ResumesProfileLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="add-resume"
        options={{
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
};

export default ResumesProfileLayout;
