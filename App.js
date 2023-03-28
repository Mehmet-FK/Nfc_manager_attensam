import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStateProvider from "./src/AppContext";
import AndroidPrompt from "./src/components/AndroidPrompt";
import ListItem from "./src/components/ListItem";
import Activate from "./src/pages/Activate";
import AddNdefRecord from "./src/pages/AddNdefRecord";
import Confirm from "./src/pages/Confirm";
import Home from "./src/pages/Home";
import Info from "./src/pages/Info";
import SelectTyp from "./src/pages/SelectTyp";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <AppStateProvider>
      <NavigationContainer>
        <AndroidPrompt />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Attensam NFC Manager" }}
          />
          <Stack.Screen name="Activate" component={Activate} />
          <Stack.Screen name="Confirm" component={Confirm} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="SelectTyp" component={SelectTyp} />
          <Stack.Screen name="AddNdefRecord" component={AddNdefRecord} />
          <Stack.Screen name="ListItem" component={ListItem} />
          <Stack.Screen name="ActivateDetails" component={SelectTyp} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateProvider>
  );
}
