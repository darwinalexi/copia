import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from "./src/Pages/Home";
import Two from "./src/Pages/Two";


function App() {

  const Stack= createNativeStackNavigator();
  return(
  <NavigationContainer>

    <Stack.Navigator initialRouteName="main">
      <Stack.Screen name="main" component={Home}/>
      <Stack.Screen name="main2" component={Two}/>
    </Stack.Navigator>
  
  </NavigationContainer>
  )
}

export default App