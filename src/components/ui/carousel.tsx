import React, { useRef } from "react";
import styled from "styled-components/native";
import { Dimensions, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

interface CarouselProps {
  data: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
  itemWidth?: number;
}

const Container = styled.View`
  align-items: center;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  width: 100px;
`;

const NavButton = styled.TouchableOpacity`
  padding: 8px;
  background-color: #f1f1f1;
  border-radius: 20px;
`;

export const CarouselComponent: React.FC<CarouselProps> = ({
  data,
  renderItem,
  itemWidth = Dimensions.get("window").width * 0.8,
}) => {
  const carouselRef = useRef<Carousel<any>>(null);

  return (
    <Container>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={itemWidth}
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={0.9}
      />
      <Buttons>
        <NavButton onPress={() => carouselRef.current?.snapToPrev()}>
          <ArrowLeft size={18} color="#6C4EE3" />
        </NavButton>
        <NavButton onPress={() => carouselRef.current?.snapToNext()}>
          <ArrowRight size={18} color="#6C4EE3" />
        </NavButton>
      </Buttons>
    </Container>
  );
};
