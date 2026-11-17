import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type OnboardingProps = {
  onComplete?: () => void;
};

export default function OnboardingScreen({ onComplete }: OnboardingProps) {
  return (
    <View className="flex-1 justify-center items-center bg-slate-900 px-6">
      <Text className="text-3xl font-extrabold text-white text-center mb-3">
        Onboarding Screen
      </Text>
      <Text className="text-base text-slate-400 text-center mb-8">
        Yahan aap apna onboarding slider ya design add kar sakte hain.
      </Text>

      <TouchableOpacity
        onPress={onComplete}
        className="w-full bg-indigo-600 py-3.5 rounded-xl items-center mb-3"
      >
        <Text className="text-white font-bold text-base">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
