import React, { useState } from "react";
import { View } from "react-native";
import { Store } from "../Store";
import Swap from "../Swap";
import BottomMenu from "../../components/BottomMenu/BottomMenu";

const Wrapper: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState("Store");

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === "Store" && <Store />}
      {currentScreen === "Swap" && <Swap />}
      <BottomMenu onNavigate={handleNavigation} />
    </View>
  );
};

export default Wrapper;
