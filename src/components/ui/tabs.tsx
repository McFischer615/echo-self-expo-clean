// components/ui/tabs.tsx
import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const Tabs: React.FC<{ routes: { key: string; title: string }[]; scenes: any }> = ({
  routes,
  scenes,
}) => {
  const [index, setIndex] = useState(0);

  return (
    <StyledContainer>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap(scenes)}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#6C4EE3" }}
            style={{ backgroundColor: "#fff" }}
            labelStyle={{ color: "#6C4EE3", fontWeight: "600" }}
          />
        )}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
