// components/ui/carousel.tsx
import React, { useRef } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

interface CarouselProps {
  data: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
  itemWidth?: number;
}

export const CarouselComponent: React.FC<CarouselProps> = ({
  data,
  renderItem,
  itemWidth = Dimensions.get("window").width * 0.8,
}) => {
  const carouselRef = useRef<Carousel<any>>(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={itemWidth}
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={0.9}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => carouselRef.current?.snapToPrev()}
          style={styles.navButton}
        >
          <ArrowLeft size={18} color="#6C4EE3" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => carouselRef.current?.snapToNext()}
          style={styles.navButton}
        >
          <ArrowRight size={18} color="#6C4EE3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: 100,
  },
  navButton: {
    padding: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
  },
});
