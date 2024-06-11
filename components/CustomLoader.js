import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';


const Dot = ({ angle }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 500, // Faster rotation
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();
    return () => rotateAnimation.stop();
  }, [rotation]);

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const transform = {
    transform: [
      { translateX: 25 * Math.cos(angle) }, // Ensure these are numbers
      { translateY: 25 * Math.sin(angle) }, // Ensure these are numbers
      { rotate: rotationInterpolate },
      { rotate: `${angle}rad` }, // Rotate to point the dot towards the center
    ],
  };

  return <Animated.View style={[styles.dot, transform]} />;
};

const CustomLoader = () => {
  const dots = Array.from({ length: 10 }); // 10 dots for star shape

  return (
    <View style={styles.loaderContainer}>
      {dots.map((_, index) => {
        const angle = (index / dots.length) * 2 * Math.PI; // Ensure this is a number
        return <Dot key={index} angle={angle} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    width: 5,
    height: 20, // Tall height for star-ray effect
    borderRadius: 2.5,
    backgroundColor: 'orange',
  },
});

export default CustomLoader;
