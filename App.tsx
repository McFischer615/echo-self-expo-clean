import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components/native";
import Toast from "react-native-toast-message";

// ✅ Theme
import { echoselfTheme } from "@/theme/echoself-theme";

// ✅ Screens (correct alias paths)
import HomeScreen from "@/screens/HomeScreen";
import AuthScreen from "@/screens/AuthScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import CreateEchoScreen from "@/screens/CreateEchoScreen";
import ChatWithEchoScreen from "@/screens/ChatWithEchoScreen";
import ApiGatewayScreen from "@/screens/ApiGatewayScreen";
import DeveloperPortalScreen from "@/screens/DeveloperPortalScreen";
import NotFoundScreen from "@/screens/NotFoundScreen";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={echoselfTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen name="CreateEchoScreen" component={CreateEchoScreen} />
            <Stack.Screen name="ChatWithEchoScreen" component={ChatWithEchoScreen} />
            <Stack.Screen name="ApiGatewayScreen" component={ApiGatewayScreen} />
            <Stack.Screen
              name="DeveloperPortalScreen"
              component={DeveloperPortalScreen}
            />
            <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
          </Stack.Navigator>
        </NavigationContainer>

        {/* ✅ Toast outside navigation */}
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
