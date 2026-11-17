import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Check, Award, Phone, Star, Wallet, ChevronRight } from 'lucide-react-native';

export function ProfileHeaderCard({ isDark }: { isDark: boolean }) {
  return (
    <View className="gap-4">
      {/* 1. HERO TRAVELER CARD */}
      <View className="bg-[#0B1E3B] rounded-3xl p-5 overflow-hidden shadow-md">
        <View className="flex-row items-center gap-4 mb-5">
          {/* Avatar + Verified Badge */}
          <View className="relative">
            <Image
              source={{ uri: 'https://unsplash.com' }}
              className="w-16 h-16 rounded-full border-2 border-white/20"
            />
            <View className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0B1E3B] items-center justify-center">
              <Check size={11} color="#fff" strokeWidth={3} />
            </View>
          </View>

          {/* Name & Membership */}
          <View className="flex-1">
            <Text className="text-white text-xl font-extrabold tracking-tight">Rohan Verma</Text>
            <View className="self-start flex-row items-center bg-white/10 px-2.5 py-1 rounded-full gap-1 mt-1">
              <Award size={12} color="#fbbf24" />
              <Text className="text-[10px] font-bold text-amber-300">Veda Gold Explorer • Since '23</Text>
            </View>
            <View className="flex-row items-center gap-1.5 mt-1.5">
              <Phone size={11} color="#94a3b8" />
              <Text className="text-slate-300 text-xs font-medium">+91 98765 43210</Text>
            </View>
          </View>
        </View>

        {/* 3-Column Stats Bar */}
        <View className="flex-row items-center bg-white/10 rounded-2xl p-2">
          <View className="flex-1 items-center py-1.5">
            <Text className="text-white text-base font-black">12</Text>
            <Text className="text-[9px] font-bold text-slate-300 tracking-wider mt-0.5">TRIPS DONE</Text>
          </View>

          <View className="flex-1 items-center py-1.5 bg-white/10 rounded-xl">
            <View className="flex-row items-center gap-1">
              <Star size={12} color="#2dd4bf" fill="#2dd4bf" />
              <Text className="text-teal-300 text-base font-black">4,850</Text>
            </View>
            <Text className="text-[9px] font-bold text-teal-200 tracking-wider mt-0.5">Veda Miles</Text>
          </View>

          <View className="flex-1 items-center py-1.5">
            <Text className="text-white text-base font-black">8</Text>
            <Text className="text-[9px] font-bold text-slate-300 tracking-wider mt-0.5">STATES VISITED</Text>
          </View>
        </View>
      </View>

      {/* 2. TRAVEL CREDITS WALLET CARD */}
      <View className={`flex-row items-center justify-between p-4 rounded-2xl border-l-4 border-l-amber-400 border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
        <View className="flex-row items-center gap-3 flex-1 pr-2">
          <View className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 items-center justify-center">
            <Wallet size={20} color="#d97706" />
          </View>
          <View>
            <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider">TRAVEL CREDITS</Text>
            <View className="flex-row items-baseline gap-1 mt-0.5">
              <Text className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>₹3,500</Text>
              <Text className="text-[11px] font-semibold text-teal-700 dark:text-teal-400">Available</Text>
            </View>
          </View>
        </View>

        <Pressable onPress={() => { /* TODO: Redeem credits */ }} className="flex-row items-center bg-[#0f766e] px-4 py-2.5 rounded-full gap-1">
          <Text className="text-white text-xs font-bold">Redeem</Text>
          <ChevronRight size={14} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}
