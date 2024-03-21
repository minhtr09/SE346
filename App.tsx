import { useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import { Home } from "./src/screens/Homes";
import RootProvider from "./src/providers";
export default function App() {
  const SplashScreenHide = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreenHide();
    }, 3000);
  }, []);



  return (

    <RootProvider>
      <StatusBar style="auto" hidden />
      <Home />
    </RootProvider >

  );
}
