import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, Luggage, Mountain, Star, ChevronDown } from 'lucide-react-native';
import { AppHeader } from '../../components/Navbar/AppHeader';
import { ActiveTripCard } from "./ActiveTripCard";

const TABS = [
  { id: 'Upcoming', label: 'Upcoming', count: 1 },
  { id: 'Ongoing', label: 'Ongoing', count: 0 },
  { id: 'Completed', label: 'Completed', count: 3 },
  { id: 'Cancelled', label: 'Cancelled', count: 0 },
];

export default function MyTripsScreen() {
  const isDark = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState('Upcoming');

  return (
    <View className={`flex-1 ${isDark ? 'bg-zinc-950' : 'bg-slate-50'}`}>
      <AppHeader tabLabel="MY TRIPS" />

      <View className="px-4 pt-3 pb-2">
        <View className={`flex-row p-1.5 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200/80'}`}>
          {TABS.map((t) => {
            const active = activeTab === t.id;
            return (
              <Pressable
                key={t.id}
                onPress={() => { /* TODO */ setActiveTab(t.id); }}
                className={`flex-1 py-2 px-1 rounded-xl items-center justify-center ${active ? 'bg-[#0B172A] dark:bg-teal-600' : ''}`}
              >
                <Text numberOfLines={1} className={`text-[11px] font-bold ${active ? 'text-white' : isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                  {t.label}
                </Text>
                <Text className={`text-[10px] font-extrabold mt-0.5 ${active ? 'text-teal-300 dark:text-white' : 'text-slate-400'}`}>
                  ({t.count})
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-4 pt-2 pb-28 gap-5">
        <ActiveTripCard isDark={isDark} />

        <View className={`rounded-3xl p-4 border gap-2.5 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
          <View className="flex-row justify-between items-center mb-1">
            <Text className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Pre-Departure Essentials</Text>
            <View className="bg-teal-50 dark:bg-teal-950 px-2.5 py-1 rounded-full">
              <Text className="text-[10px] font-bold text-teal-700 dark:text-teal-400">1 of 3 Done</Text>
            </View>
          </View>

          <Pressable onPress={() => { /* TODO */ }} className={`flex-row items-center justify-between p-3 rounded-2xl ${isDark ? 'bg-zinc-800/80' : 'bg-slate-50'}`}>
            <View className="flex-row items-center gap-3 flex-1">
              <CheckCircle2 size={20} color="#10b981" />
              <View>
                <Text className="text-xs font-bold text-slate-400 line-through">Mandatory Govt ID uploaded</Text>
                <Text className="text-[10px] text-teal-600 dark:text-teal-400">Verified for 2 Guests (Aadhaar)</Text>
              </View>
            </View>
            <CheckCircle2 size={16} color="#64748b" />
          </Pressable>

          <Pressable onPress={() => { /* TODO */ }} className={`flex-row items-center justify-between p-3 rounded-2xl ${isDark ? 'bg-zinc-800/80' : 'bg-slate-50'}`}>
            <View className="flex-row items-center gap-3">
              <Luggage size={18} color="#4f46e5" />
              <Text className={`text-xs font-bold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>Luggage Limit (15kg Volvo Bay)</Text>
            </View>
            <ChevronDown size={16} color="#64748b" />
          </Pressable>

          <Pressable onPress={() => { /* TODO */ }} className={`flex-row items-center justify-between p-3 rounded-2xl ${isDark ? 'bg-zinc-800/80' : 'bg-slate-50'}`}>
            <View className="flex-row items-center gap-3">
              <Mountain size={18} color="#0284c7" />
              <Text className={`text-xs font-bold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>Mountain Acclimatization Tips</Text>
            </View>
            <ChevronDown size={16} color="#64748b" />
          </Pressable>
        </View>

        <View>
          <View className="flex-row justify-between items-center mb-2.5">
            <Text className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Recent Memories</Text>
            <Pressable onPress={() => { /* TODO */ }}>
              <Text className="text-xs font-bold text-teal-700 dark:text-teal-400">See all (3)</Text>
            </Pressable>
          </View>

          <View className={`flex-row items-center p-3 rounded-2xl border gap-3 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
            <Image source={{ uri: 'https://unsplash.com' }} className="w-16 h-16 rounded-xl" />
            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-[10px] font-bold text-teal-700 dark:text-teal-400">Completed • Jan 2024</Text>
                <View className="flex-row items-center gap-0.5 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded">
                  <Star size={10} color="#f59e0b" fill="#f59e0b" />
                  <Text className="text-[10px] font-bold text-amber-700 dark:text-amber-400">4.9</Text>
                </View>
              </View>
              <Text numberOfLines={1} className={`text-xs font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Royal Rajasthan Heritage Explorer</Text>
              <Text className="text-[10px] text-slate-400 mt-0.5">Jaipur • Jodhpur • Udaipur (7 Days)</Text>
              <View className="flex-row justify-between items-center mt-1.5">
                <Text className="text-[9px] font-bold text-slate-400">SV-RAJ-8810</Text>
                <Pressable onPress={() => { /* TODO */ }} className="bg-slate-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
                  <Text className="text-[10px] font-bold text-teal-700 dark:text-teal-400">Rate Trip</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
