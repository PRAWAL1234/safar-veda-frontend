import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { ArrowLeft, Bell, Share2, MoreVertical } from 'lucide-react-native';
import { UserMenu } from '@/components/user-menu';

type AppHeaderProps = {
  isNested?: boolean; // True jab aap Package Detail ya Booking Flow mein hon
  title?: string; // Nested screen ka naam (e.g. "Trip Detail", "Booking Flow")
  tabLabel?: string; // Main tab ka sub-label (e.g. "HOME", "EXPLORE")
  onSharePress?: () => void;
};

export function AppHeader({
  isNested = false,
  title = 'Trip Detail',
  tabLabel = 'HOME',
  onSharePress,
}: AppHeaderProps) {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 border-b ${
        isDark
          ? 'bg-zinc-950 border-zinc-800/80'
          : 'bg-white border-slate-200/70'
      }`}
    >
      {/* LEFT SIDE */}
      {!isNested ? (
        // 1. MAIN TAB HEADER (Home, Explore, My Trips, Profile)
        <View className="flex-row items-center gap-2.5">
          <Image
            source={require('../../../src/assets/safarveda_official_app_icon_brand_logo.png')}
            className="w-8 h-8 rounded-lg"
            resizeMode="contain"
          />
          <View>
            <Text
              className={`text-base font-extrabold leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              SafarVeda
            </Text>
            <Text className="text-[10px] font-bold tracking-widest text-teal-700 dark:text-teal-400 uppercase">
              {tabLabel}
            </Text>
          </View>
        </View>
      ) : (
        // 2. NESTED SCREEN HEADER (Back Arrow + Mini Logo + Screen Title)
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => navigation.goBack()}
            className="p-1.5 -ml-1.5 rounded-full active:bg-slate-100 dark:active:bg-zinc-800"
          >
            <ArrowLeft size={22} color={isDark ? '#ffffff' : '#0f172a'} />
          </Pressable>

          <Image
            source={require('../../../src/assets/safarveda_official_app_icon_brand_logo.png')}
            className="w-7 h-7 rounded-md"
            resizeMode="contain"
          />

          <Text
            className={`text-base font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {title}
          </Text>
        </View>
      )}

      {/* RIGHT SIDE */}
      {!isNested ? (
        // Main Tab Icons: Bell + Profile Avatar
        <View className="flex-row items-center gap-3">
          <Pressable className="relative p-1.5">
            <Bell size={20} color={isDark ? '#e4e4e7' : '#334155'} />
            <View className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </Pressable>
          <UserMenu />
        </View>
      ) : (
        // Nested Screen Icons: Share + Three Dots Menu
        <View className="flex-row items-center gap-2">
          <Pressable onPress={onSharePress} className="p-1.5">
            <Share2 size={19} color={isDark ? '#e4e4e7' : '#334155'} />
          </Pressable>
          <Pressable className="p-1.5">
            <MoreVertical size={19} color={isDark ? '#e4e4e7' : '#334155'} />
          </Pressable>
        </View>
      )}
    </View>
  );
}
