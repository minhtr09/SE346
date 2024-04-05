import { useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import RootProvider from "./src/providers";

import { Home } from "./src/screens/Homes";
import { StateContextProvider } from "./src/context";
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
      <StateContextProvider>
        <StatusBar style="auto" hidden />
        <Home />
      </StateContextProvider>

    </RootProvider >
  );
}