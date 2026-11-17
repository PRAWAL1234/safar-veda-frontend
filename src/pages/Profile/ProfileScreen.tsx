import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, IdCard, Bookmark, CreditCard, Sparkles, Headset, Bell, ShieldCheck, LogOut, ChevronRight } from 'lucide-react-native';
import { AppHeader } from '../../components/Navbar/AppHeader';
import { ProfileHeaderCard } from './ProfileHeaderCard';

const ACCOUNT_ITEMS = [
  { id: '1', title: 'Saved Co-Travelers & Family', sub: 'Manage guest details & Aadhaar IDs', badge: '3 Guests', badgeColor: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300', icon: Users },
  { id: '2', title: 'KYC & Govt ID Vault', sub: 'Verified Aadhaar & Passport', badge: 'Verified', badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400', icon: IdCard },
  { id: '3', title: 'Saved Wishlists & Itineraries', sub: '6 curated destinations saved', badge: '6 Saved', badgeColor: 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400', icon: Bookmark },
  { id: '4', title: 'Payment Methods & Refunds', sub: 'UPI, saved cards, and instant refund status', icon: CreditCard },
];

export default function ProfileScreen() {
  const isDark = useColorScheme() === 'dark';
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  return (
     <View className={`flex-1 gap-4 flex ${isDark
          ? 'bg-zinc-900/90 border-zinc-800'
          : 'bg-slate-100/90 border-slate-200/80 shadow-sm'
          }`}>
        <AppHeader tabLabel="PROFILE" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-4 pt-3 pb-28 gap-5">
        <ProfileHeaderCard isDark={isDark} />

        {/* ACCOUNT & EXPEDITIONS */}
        <View>
          <View className="flex-row justify-between items-center mb-2.5 px-1">
            <Text className="text-[11px] font-extrabold text-slate-400 tracking-wider">ACCOUNT & EXPEDITIONS</Text>
            <Text className="text-[11px] font-bold text-teal-700 dark:text-teal-400">4 Records</Text>
          </View>

          <View className={`rounded-3xl border overflow-hidden ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
            {ACCOUNT_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => { /* TODO: Navigate */ }}
                  className={`flex-row items-center p-3.5 gap-3 ${idx !== ACCOUNT_ITEMS.length - 1 ? 'border-b border-slate-100 dark:border-zinc-800' : ''}`}
                >
                  <View className={`w-10 h-10 rounded-xl items-center justify-center ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                    <Icon size={18} color={isDark ? '#e4e4e7' : '#1e293b'} />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text numberOfLines={1} className={`text-xs font-extrabold flex-shrink ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</Text>
                      {item.badge && (
                        <View className={`px-2 py-0.5 rounded-full ${item.badgeColor.split(' ').slice(0, 2).join(' ')}`}>
                          <Text className={`text-[9px] font-extrabold ${item.badgeColor.split(' ').slice(2).join(' ')}`}>{item.badge}</Text>
                        </View>
                      )}
                    </View>
                    <Text numberOfLines={1} className="text-[11px] text-slate-400 mt-0.5">{item.sub}</Text>
                  </View>
                  <ChevronRight size={16} color="#94a3b8" />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* PREFERENCES & SAFETY */}
        <View>
          <View className="flex-row justify-between items-center mb-2.5 px-1">
            <Text className="text-[11px] font-extrabold text-slate-400 tracking-wider">PREFERENCES & SAFETY</Text>
            <ShieldCheck size={15} color="#0f766e" />
          </View>

          <View className={`rounded-3xl border overflow-hidden ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
            <Pressable onPress={() => { /* TODO */ }} className="flex-row items-center p-3.5 gap-3 border-b border-slate-100 dark:border-zinc-800">
              <View className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 items-center justify-center"><Sparkles size={18} color="#0f766e" /></View>
              <View className="flex-1">
                <Text className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Travel Vibe & AI Mitra</Text>
                <Text numberOfLines={1} className="text-[11px] text-slate-400 mt-0.5">Customize mountain, heritage, or wellness...</Text>
              </View>
              <ChevronRight size={16} color="#94a3b8" />
            </Pressable>

            <Pressable onPress={() => { /* TODO */ }} className="flex-row items-center p-3.5 gap-3 border-b border-slate-100 dark:border-zinc-800">
              <View className={`w-10 h-10 rounded-xl items-center justify-center ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}><Headset size={18} color={isDark ? '#e4e4e7' : '#1e293b'} /></View>
              <View className="flex-1">
                <Text className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>24/7 Concierge & Emergency SOS</Text>
                <Text numberOfLines={1} className="text-[11px] text-slate-400 mt-0.5">Set trusted family emergency contact</Text>
              </View>
              <ChevronRight size={16} color="#94a3b8" />
            </Pressable>

            <View className="flex-row items-center p-3.5 gap-3 border-b border-slate-100 dark:border-zinc-800">
              <View className={`w-10 h-10 rounded-xl items-center justify-center ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}><Bell size={18} color={isDark ? '#e4e4e7' : '#1e293b'} /></View>
              <View className="flex-1">
                <Text className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Trip Alerts & Updates</Text>
                <Text numberOfLines={1} className="text-[11px] text-slate-400 mt-0.5">WhatsApp live journey alerts enabled</Text>
              </View>
              <Switch value={alertsEnabled} onValueChange={setAlertsEnabled} trackColor={{ false: '#cbd5e1', true: '#0f766e' }} thumbColor="#fff" />
            </View>

            <Pressable onPress={() => { /* TODO */ }} className="flex-row items-center p-3.5 gap-3">
              <View className={`w-10 h-10 rounded-xl items-center justify-center ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}><ShieldCheck size={18} color={isDark ? '#e4e4e7' : '#1e293b'} /></View>
              <View className="flex-1">
                <Text className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Terms & IRCTC Partner Info</Text>
                <Text numberOfLines={1} className="text-[11px] text-slate-400 mt-0.5">Certified premier travel operator details</Text>
              </View>
              <ChevronRight size={16} color="#94a3b8" />
            </Pressable>
          </View>
        </View>

        {/* LOGOUT & FOOTER */}
        <Pressable onPress={() => { /* TODO: Logout */ }} className="w-full py-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/70 dark:border-rose-900 flex-row items-center justify-center gap-2">
          <LogOut size={16} color="#e11d48" />
          <Text className="text-xs font-extrabold text-rose-600 dark:text-rose-400">Log Out from Device</Text>
        </Pressable>

        <View className="items-center gap-1 pt-1">
          <Text className="text-[11px] font-semibold text-slate-400">SafarVeda v2.4 • Crafted for Explorers</Text>
          <Text className="text-[10px] text-slate-400">Government of India Recognized Travel Partner • IRCTC Certified</Text>
        </View>
      </ScrollView>
    </View>
  );
}
