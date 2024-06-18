import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import RootProvider from "./src/providers";
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';

import { Home } from "./src/screens/Homes";
import { Store } from "./src/screens/Store";
import Swap from "./src/screens/Swap";


import { StateContextProvider } from "./src/context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Start } from "./src/screens/Homes/Game/Start";
import { Text } from "react-native";
import { View } from "react-native";
//import {getAddress} from "./src/utils/address";

export default function App() {


  const SplashScreenHide = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  
  function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    
      <RootProvider>
        <StateContextProvider>
          <NavigationContainer>
            <StatusBar style="auto" hidden />
            <Stack.Navigator >
            <Stack.Screen name="Swap" component={Swap}/>
              <Stack.Screen name="Home" 
              component={Home} 
              options={{
                headerShown: false
              }} />
              <Stack.Screen name="Store" component={Store}/>
          
            </Stack.Navigator>
          </NavigationContainer>
        </StateContextProvider>
      </RootProvider>
    );
}