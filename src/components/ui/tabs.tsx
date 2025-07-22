// components/ui/tabs.tsx
import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";

export const Tabs: React.FC<{ routes: { key: string; title: string }[]; scenes: any }> = ({
  routes,
  scenes,
}) => {
  const [index, setIndex] = useState(0);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap(scenes)}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <TabBar {...props} indicatorStyle={{ backgroundColor: "#6C4EE3" }} />
      )}
    />
  );
};
