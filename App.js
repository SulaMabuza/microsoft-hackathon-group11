import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import FacilityScreen from "./screens/FacilityScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import AuthStack from './context/AuthContext';
import {AuthProvider} from './context/AuthContext';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';
import TodoListScreen from './screens/TodoListScreen';
import AboutVaxx from './screens/AboutVaxx';
import GetDirections from './screens/GetDirections';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>

          <Stack.Navigator>
            {/*Screens*/}
            <Stack.Screen options={{headerShown:false}} name="Login" component={SignInScreen}/>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Facility" component={FacilityScreen} />
            <Stack.Screen name="Basket" component={BasketScreen}
              options={{ presentation: 'modal', headerShown: false }} //pops from the ground
             />
             <Stack.Screen 
              name="PreparingOrderScreen" 
              component={PreparingOrderScreen}
              options={{ presentation: "fullScreenModal", headerShown: false}} 
              />
             <Stack.Screen 
              name="Delivery" 
              component={DeliveryScreen}
              options={{ presentation: "fullScreenModal", headerShown: false}} 
              />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TodoList"
              component={TodoListScreen}
              options={{presentation: 'modal',headerShown: false}}
            />
            <Stack.Screen
              name="AboutVaxx"
              component={AboutVaxx} 
              options={{presentation: 'modal', headerShown: false}}
            /> 
            <Stack.Screen 
              name="GetDirections"
              component={GetDirections}
              options = {{presentation: "fullScreenModal", headerShown: false}}
            />            
          </Stack.Navigator>

        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}

