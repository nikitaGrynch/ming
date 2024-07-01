import { Redirect, Stack} from "expo-router";
import { useAuth } from "src/context/AuthContext";
import useUserStore from "src/store/userStore";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="tabs" />
        <Stack.Screen
          name="common/advt/[id]"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    );
  } else {
    return <Redirect href="/sign-in" />;
  }
}
