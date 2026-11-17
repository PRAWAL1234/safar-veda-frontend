import React from 'react';
import { View, Text, ImageBackground, Image, Pressable } from 'react-native';
import { Clock, Calendar, Bus, Wallet, Phone, MessageSquare, Navigation, FileText, Users } from 'lucide-react-native';

export function ActiveTripCard({ isDark }: { isDark: boolean }) {
  return (
    <View className={`rounded-3xl overflow-hidden border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
      <ImageBackground source={{ uri: 'https://unsplash.com' }} className="h-44 p-3.5 justify-between">
        <View className="absolute inset-0 bg-black/35" />
        <View className="absolute bottom-0 left-0 right-0 h-28 bg-[#061326]/90" />

        <View className="flex-row justify-between items-center z-10">
          <View className="flex-row items-center bg-[#0f766e] px-2.5 py-1 rounded-full gap-1.5">
            <View className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            <Text className="text-[10px] font-extrabold text-white">Confirmed • #SV-98421</Text>
          </View>
          <View className="flex-row items-center bg-white/95 px-2.5 py-1 rounded-full gap-1">
            <Clock size={11} color="#0f172a" />
            <Text className="text-[10px] font-bold text-slate-900">Departs in 4 Days</Text>
          </View>
        </View>

        <View className="z-10">
          <Text className="text-[10px] font-extrabold text-teal-300 tracking-wider">SV-HIM-2024 • VEDA ESCORTED SERIES</Text>
          <Text className="text-white text-lg font-extrabold mt-0.5">Magical Himachal Group Tour</Text>
          <View className="flex-row items-center gap-1.5 mt-1">
            <Calendar size={12} color="#cbd5e1" />
            <Text className="text-slate-300 text-xs">Fri, 18 Oct 2024 • 8 Days / 8 Nights</Text>
          </View>
        </View>
      </ImageBackground>

      <View className="p-4 gap-3">
        <View className={`flex-row items-center p-3 rounded-2xl gap-3 ${isDark ? 'bg-zinc-800/80' : 'bg-slate-50'}`}>
          <View className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 items-center justify-center">
            <Bus size={18} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text className="text-[9px] font-extrabold text-slate-400 tracking-wider">PICKUP ASSEMBLY POINT</Text>
            <Text className={`text-xs font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Majnu Ka Tilla AC Volvo Hub, Delhi</Text>
            <Text className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 mt-0.5">Reporting Time: 09:00 PM (Sharp)</Text>
          </View>
        </View>

        <View className={`flex-row items-center justify-between p-3 rounded-2xl border ${isDark ? 'bg-amber-950/30 border-amber-900/50' : 'bg-amber-50/80 border-amber-200/60'}`}>
          <View className="flex-row items-center gap-2.5 flex-1 pr-2">
            <Wallet size={18} color="#d97706" />
            <View>
              <Text className="text-[10px] font-semibold text-amber-800 dark:text-amber-300">Advance Paid ₹10,000</Text>
              <Text className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Balance ₹31,598 due in 6 days</Text>
            </View>
          </View>
          <Pressable onPress={() => { /* TODO */ }} className="bg-[#0B172A] dark:bg-amber-600 px-3.5 py-2 rounded-xl">
            <Text className="text-white text-xs font-bold">Pay Now</Text>
          </Pressable>
        </View>

        <View className={`flex-row items-center justify-between p-3 rounded-2xl ${isDark ? 'bg-zinc-800/80' : 'bg-slate-50'}`}>
          <View className="flex-row items-center gap-2.5 flex-1">
            <Image source={{ uri: 'https://unsplash.com' }} className="w-10 h-10 rounded-full" />
            <View>
              <Text className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Priya Sharma</Text>
              <Text className="text-[11px] text-slate-500">Lead Expedition Coordinator</Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <Pressable onPress={() => { /* TODO */ }} className={`w-9 h-9 rounded-xl items-center justify-center border ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
              <Phone size={15} color={isDark ? '#fff' : '#0f172a'} />
            </Pressable>
            <Pressable onPress={() => { /* TODO */ }} className="w-9 h-9 rounded-xl bg-[#0f766e] items-center justify-center">
              <MessageSquare size={15} color="#fff" />
            </Pressable>
          </View>
        </View>

        <Pressable onPress={() => { /* TODO */ }} className="w-full py-3.5 rounded-2xl bg-[#0f766e] flex-row items-center justify-center gap-2">
          <Navigation size={16} color="#fff" />
          <Text className="text-white text-xs font-extrabold">Track Live Volvo & Trail</Text>
        </Pressable>

        <View className="flex-row gap-2">
          <Pressable onPress={() => { /* TODO */ }} className={`flex-1 py-2.5 rounded-xl items-center border ${isDark ? 'bg-zinc-800/60 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
            <FileText size={16} color={isDark ? '#e4e4e7' : '#334155'} />
            <Text className={`text-[10px] font-bold mt-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>View Voucher</Text>
          </Pressable>
          <Pressable onPress={() => { /* TODO */ }} className={`flex-1 py-2.5 rounded-xl items-center border ${isDark ? 'bg-zinc-800/60 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
            <Users size={16} color={isDark ? '#e4e4e7' : '#334155'} />
            <Text className={`text-[10px] font-bold mt-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>Passengers</Text>
          </Pressable>
          <Pressable onPress={() => { /* TODO */ }} className="flex-1 py-2.5 rounded-xl items-center bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900">
            <Text className="text-xs font-black text-rose-600">SOS</Text>
            <Text className="text-[10px] font-bold text-rose-600 mt-0.5">24/7 SOS</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
