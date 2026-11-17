import React from 'react';
import { View, Text, ImageBackground, Pressable } from 'react-native';
import { Heart, Star, Users, Calendar, Thermometer, Clock } from 'lucide-react-native';

export function ExpeditionCard({ item, isDark, onPress }: any) {
  return (
    <View className={`mx-4 mb-4 rounded-3xl overflow-hidden border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
      <ImageBackground source={{ uri: item.img }} className="h-44 p-3 justify-between">
        <View className="flex-row justify-between items-start">
          <View className="flex-row flex-wrap gap-1.5 max-w-[80%]">
            <View className="flex-row items-center bg-white/95 px-2.5 py-1 rounded-full gap-1">
              <Calendar size={11} color="#0f766e" />
              <Text className="text-[10px] font-bold text-slate-800">Best time: {item.time}</Text>
            </View>
            <View className="flex-row items-center bg-white/95 px-2.5 py-1 rounded-full gap-1">
              <Thermometer size={11} color="#0284c7" />
              <Text className="text-[10px] font-bold text-slate-800">{item.temp}</Text>
            </View>
          </View>
          <Pressable className="w-8 h-8 rounded-full bg-white/90 items-center justify-center">
            <Heart size={15} color="#0f172a" />
          </Pressable>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="bg-[#0f766e] px-2.5 py-1 rounded-md">
            <Text className="text-[9px] font-extrabold text-white">{item.badge}</Text>
          </View>
          <View className="flex-row items-center bg-white/95 px-2.5 py-1 rounded-full gap-1">
            <Star size={11} color="#f59e0b" fill="#f59e0b" />
            <Text className="text-[11px] font-extrabold text-slate-900">{item.rating}</Text>
          </View>
        </View>
      </ImageBackground>

      <View className="p-4">
        <Text className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</Text>
        <Text className="text-xs text-slate-500 leading-4 mt-1 mb-3">{item.desc}</Text>

        <View className="flex-row items-center gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-zinc-800">
          <View className="flex-row items-center gap-1">
            <Users size={13} color="#0f766e" />
            <Text className="text-[11px] font-bold text-teal-700 dark:text-teal-400">{item.batches}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Clock size={13} color="#64748b" />
            <Text className="text-[11px] font-semibold text-slate-500">{item.dur}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-[10px] text-slate-400">Starting price</Text>
            <Text className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.price} <Text className="text-xs font-normal text-slate-400">/ person</Text></Text>
          </View>
          <Pressable onPress={onPress} className="bg-[#0B172A] dark:bg-teal-600 px-4 py-2.5 rounded-xl">
            <Text className="text-white text-xs font-bold">View Itinerary</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
