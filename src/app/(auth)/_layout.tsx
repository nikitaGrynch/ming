import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
      {/* <Stack.Screen name="forgot-password" /> */}
    </Stack>
  );
}
