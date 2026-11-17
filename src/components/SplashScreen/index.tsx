import React, { useEffect } from 'react';
import { View, Image, Text, useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

// Reanimated wrappers for Tailwind classes mapping
const AnimatedView = Animated.createAnimatedComponent(View);

type SplashScreenProps = {
  onAnimationComplete: () => void;
};

export default function SplashScreen({
  onAnimationComplete,
}: SplashScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animation states
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const textY = useSharedValue(50);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Logo Animation (Zoom + Fade in)
    logoScale.value = withSpring(1, { damping: 12, stiffness: 90 });
    logoOpacity.value = withTiming(1, { duration: 600 });

    // 2. Text Slide up (Delay ke sath)
    textY.value = withDelay(
      350,
      withSpring(0, { damping: 15, stiffness: 100 }),
    );
    textOpacity.value = withDelay(350, withTiming(1, { duration: 500 }));

    // 3. Splash Screen exit timer (Zepto takes ~2.5s)
    const timer = setTimeout(() => {
      if (onAnimationComplete) onAnimationComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Animated Styles
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textY.value }],
  }));

  return (
    <View
      className={`flex-1 justify-center items-center relative ${
        isDark ? 'bg-[#010001]' : 'bg-[#ffffff]'
      }`}
    >
      <AnimatedView style={logoStyle} className="items-center justify-center">
        <Image
          source={require('../../../src/assets/safarveda_official_app_icon_brand_logo.png')}
          className="w-36 h-36 rounded-3xl"
          resizeMode="contain"
        />
      </AnimatedView>

      <AnimatedView
        style={textStyle}
        className="absolute bottom-16 items-center w-full px-6"
      >
        <Text className="text-white text-4xl font-black tracking-widest text-center">
          Safar Veda
        </Text>
        <Text className="text-yellow-400 text-sm font-semibold tracking-wide mt-2 text-center">
          Travel your way
        </Text>
      </AnimatedView>
    </View>
  );
}
