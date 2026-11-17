import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, ImageBackground, Pressable, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal, Sparkles, Heart, Star, ArrowRight, Users, HeartHandshake } from 'lucide-react-native';
import { AppHeader } from '../../components/Navbar/AppHeader';
import { ExpeditionCard } from './ExpeditionCard';


const DATA = {
  cats: ['All', 'Himachal & North', 'Rajasthan & Desert', 'Kerala & South'],
  hero: { match: '98%', tag: 'AYURVEDIC SANCTUARY • 6 DAYS', rating: '4.98 (240+)', title: 'Varkala Cliffside & Kumarakom', sub: 'Holistic coastal retreat with master yogis & houseboat.', price: '₹18,499', img: 'https://unsplash.com' },
  styles: [{ id: '1', label: 'Group Solo Travelers', icon: Users }, { id: '2', label: 'Couple Getaways', icon: HeartHandshake }],
  list: [
    { id: '1', cat: 'Himachal & North', time: 'Jun - Sep', temp: '-2°C to 12°C', badge: 'HIGH ALTITUDE EXPEDITION', rating: '4.9', title: 'Spiti Valley & Chandra Taal', desc: 'Stargazing at Key Monastery, high-pass 4x4 safaris & lakeside camping.', batches: '12 upcoming batches', dur: '8D / 7N', price: '₹24,999', img: 'https://unsplash.com' },
    { id: '2', cat: 'Rajasthan & Desert', time: 'Oct - Feb', temp: '14°C to 26°C', badge: 'ROYAL HERITAGE & CAMPS', rating: '4.8', title: 'Jaisalmer & Thar Dunes', desc: 'Private tented camps, royal folk evenings & sand dunes quad safaris.', batches: '8 batches', dur: '4D / 3N', price: '₹8,999', img: 'https://unsplash.com' },
  ],
};

export default function ExploreScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? DATA.list : DATA.list.filter(i => i.cat === cat);

  const Header = () => (
    <View className="gap-4 pb-4">
      <View className="flex-row items-center gap-2.5 px-4 pt-3">
        <Pressable className={`flex-1 flex-row items-center px-3.5 h-12 rounded-2xl border gap-2 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
          <Search size={18} color="#94a3b8" />
          <Text className="text-xs text-slate-400">Search Himachal, Kerala, Spiti...</Text>
        </Pressable>
        <Pressable className={`w-12 h-12 rounded-2xl items-center justify-center border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-teal-50 border-teal-100'}`}>
          <SlidersHorizontal size={18} color={isDark ? '#2dd4bf' : '#0f766e'} />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 gap-2">
        {DATA.cats.map(c => (
          <Pressable key={c} onPress={() => setCat(c)} className={`px-4 py-2 rounded-full border ${cat === c ? 'bg-[#0B172A] dark:bg-teal-600 border-transparent' : isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <Text className={`text-xs font-bold ${cat === c ? 'text-white' : isDark ? 'text-zinc-300' : 'text-slate-600'}`}>{c}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View className="px-4">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center gap-1.5">
            <Sparkles size={16} color="#0f766e" />
            <Text className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Curated For Your Energy</Text>
          </View>
          <Text className="text-[10px] font-extrabold text-teal-700 dark:text-teal-400">LIVE AFFINITY</Text>
        </View>

        <View className="h-60 rounded-3xl overflow-hidden bg-slate-900">
          <ImageBackground source={{ uri: DATA.hero.img }} className="flex-1 justify-between p-4">
            <View className="absolute inset-0 bg-black/30" />
            <View className="absolute bottom-0 left-0 right-0 h-36 bg-[#061326]/90" />
            <View className="flex-row justify-between items-center z-10">
              <View className="bg-white/95 px-3 py-1 rounded-full">
                <Text className="text-[10px] font-extrabold text-teal-800">Veda Match Score: {DATA.hero.match}</Text>
              </View>
              <Pressable className="w-8 h-8 rounded-full bg-white/90 items-center justify-center"><Heart size={15} color="#0f172a" /></Pressable>
            </View>
            <View className="z-10">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-[10px] font-extrabold text-teal-300">{DATA.hero.tag}</Text>
                <View className="flex-row items-center gap-1">
                  <Star size={11} color="#fbbf24" fill="#fbbf24" />
                  <Text className="text-[10px] font-bold text-white">{DATA.hero.rating}</Text>
                </View>
              </View>
              <Text className="text-white text-lg font-extrabold">{DATA.hero.title}</Text>
              <Text numberOfLines={1} className="text-slate-300 text-xs mb-2.5">{DATA.hero.sub}</Text>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-[10px] text-slate-400">All-inclusive from</Text>
                  <Text className="text-white text-lg font-black">{DATA.hero.price} <Text className="text-xs font-normal text-slate-300">/ guest</Text></Text>
                </View>
                <Pressable onPress={() => navigation?.navigate('PackageDetail')} className="flex-row items-center bg-[#0f766e] px-4 py-2.5 rounded-xl gap-1">
                  <Text className="text-white text-xs font-bold">Explore Trip</Text>
                  <ArrowRight size={14} color="#fff" />
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>

      <View className="flex-row justify-between items-end px-4 pt-1">
        <View>
          <Text className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Curated Expeditions</Text>
          <Text className="text-xs text-slate-500">Verified expert-led itineraries</Text>
        </View>
        <SlidersHorizontal size={18} color={isDark ? '#a1a1aa' : '#475569'} />
      </View>
    </View>
  );

  return (
    <View className={`flex-1 ${isDark ? 'bg-zinc-950' : 'bg-slate-50'}`}>
      <AppHeader tabLabel="EXPLORE" />
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-28"
        renderItem={({ item }) => (
          <ExpeditionCard item={item} isDark={isDark} onPress={() => navigation?.navigate('PackageDetail')} />
        )}
      />
    </View>
  );
}
