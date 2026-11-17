import SearchInput from '../../components/SearchInput.tsx';
import { AppHeader } from '../../components/Navbar/AppHeader';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View, useColorScheme, useWindowDimensions } from 'react-native';
import HomeToursSection from './Departure.tsx';
import TrendingAndPromiseSection from './TiltTourCard.tsx';

type HomeScreenProps = {
  onLogout?: () => void;
};

export default function HomeScreen({ onLogout }: HomeScreenProps) {
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';
  const { width, height } = useWindowDimensions();
  const isVertical = width > height;

  return (
    <View className={`flex-1 gap-4 flex ${isDark
      ? 'bg-zinc-900/90 border-zinc-800'
      : 'bg-slate-100/90 border-slate-200/80 shadow-sm'
      }`}>
      <AppHeader tabLabel="HOME" />
      <View className='px-2'>
        <SearchInput />
      </View>
      <ScrollView>
        <HomeToursSection />
        <TrendingAndPromiseSection/>
      </ScrollView>
    </View>
  );
}
