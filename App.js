import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AndroidPrompt from "./src/components/AndroidPrompt";
import Activate from "./src/pages/Activate";
import AddNdefRecord from "./src/pages/AddNdefRecord";
import Deactivate from "./src/pages/Deactivate";
import Home from "./src/pages/Home";
import Info from "./src/pages/Info";
import Write from "./src/pages/Write";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AndroidPrompt />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Attensam NFC Manager" }}
        />
        <Stack.Screen name="Activate" component={Activate} />
        <Stack.Screen name="Deactivate" component={Deactivate} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Write" component={Write} />
        <Stack.Screen name="AddNdefRecord" component={AddNdefRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
