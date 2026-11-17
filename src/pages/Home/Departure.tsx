import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, ImageBackground, Pressable, useWindowDimensions, useColorScheme } from 'react-native';
import { Zap, ArrowRight, ChevronRight } from 'lucide-react-native';

const CATEGORIES = ['All Tours', 'Himachal', 'Rajasthan', 'Kerala', 'Kashmir'];
const DEP_TABS = ['This Weekend', 'Next Week', 'Diwali Special'];

const SLIDES = [
  { id: '1', cat: 'Himachal', badge: 'EARLY BIRD 15% OFF', slots: 'Limited Monsoon Slots', tag: 'CURATED EXPEDITION', title: 'Monsoon Magic in Spiti Valley & Leh', price: '₹24,999', old: '₹29,500', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80' },
  { id: '2', cat: 'Rajasthan', badge: 'ROYAL 10% OFF', slots: 'Few Suites Left', tag: 'LUXURY EXPEDITION', title: 'Golden Sands of Jaisalmer & Udaipur', price: '₹18,499', old: '₹21,000', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80' },
];

const BATCHES = [
  { id: '1', tab: 'This Weekend', d: '18', m: 'OCT', title: 'Kasol & Kheerganga Trek', sub: 'Batch #KV-104 • Delhi Volvo', seats: '4 seats left', urgent: true, price: '₹6,499' },
  { id: '2', tab: 'This Weekend', d: '25', m: 'OCT', title: 'Jaisalmer Sand Dunes Camp', sub: 'Batch #JS-89 • Jaipur Pick', seats: '8 seats left', urgent: false, price: '₹8,999' },
  { id: '3', tab: 'Next Week', d: '01', m: 'NOV', title: 'Manali Solang Snow Escape', sub: 'Batch #MN-202 • Delhi Volvo', seats: '3 seats left', urgent: true, price: '₹7,999' },
];

export default function HomeToursSection({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const { width } = useWindowDimensions();
  const cardW = width - 32;

  const [cat, setCat] = useState('All Tours');
  const [slide, setSlide] = useState(0);
  const [depTab, setDepTab] = useState('This Weekend');

  const slides = cat === 'All Tours' ? SLIDES : SLIDES.filter(i => i.cat === cat);
  const batches = BATCHES.filter(i => i.tab === depTab);

  return (
    <View className="w-full gap-6 pb-10">
      {/* 1. TOP TABS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 gap-2">
        {CATEGORIES.map(t => (
          <Pressable
            key={t}
            onPress={() => { setCat(t); setSlide(0); }}
            className={`px-5 py-2.5 rounded-full border ${cat === t ? (isDark ? 'bg-teal-600 border-teal-500' : 'bg-[#0B172A] border-[#0B172A]') : (isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200')}`}
          >
            <Text className={`text-xs font-bold ${cat === t ? 'text-white' : isDark ? 'text-zinc-300' : 'text-slate-600'}`}>{t}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* 2. IMAGE SLIDER */}
      <View>
        <FlatList
          data={slides.length ? slides : SLIDES}
          keyExtractor={i => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardW + 16}
          decelerationRate="fast"
          contentContainerClassName="px-4 gap-4"
          onMomentumScrollEnd={e => setSlide(Math.round(e.nativeEvent.contentOffset.x / (cardW + 16)))}
          renderItem={({ item }) => (
            <View style={{ width: cardW, height: 340 }} className="rounded-3xl overflow-hidden bg-slate-900">
              <ImageBackground source={{ uri: item.img }} className="flex-1 justify-between p-4">
                <View className="absolute inset-0 bg-black/35" />
                <View className="absolute bottom-0 left-0 right-0 h-48 bg-[#061326]/85" />

                <View className="flex-row justify-between items-center z-10">
                  <View className="flex-row items-center bg-[#a7f3d0] px-3 py-1.5 rounded-full gap-1">
                    <Zap size={12} color="#065f46" fill="#065f46" />
                    <Text className="text-[10px] font-extrabold text-emerald-950">{item.badge}</Text>
                  </View>
                  <View className="bg-white/95 px-3 py-1.5 rounded-full">
                    <Text className="text-[10px] font-bold text-slate-800">{item.slots}</Text>
                  </View>
                </View>

                <View className="z-10">
                  <Text className="text-[11px] font-extrabold tracking-widest text-teal-300 mb-1">{item.tag}</Text>
                  <Text className="text-white text-2xl font-extrabold leading-7 mb-4">{item.title}</Text>
                  <View className="flex-row justify-between items-end">
                    <View>
                      <Text className="text-slate-300 text-xs">Starts at</Text>
                      <View className="flex-row items-baseline gap-1.5">
                        <Text className="text-white text-xl font-black">{item.price}</Text>
                        <Text className="text-slate-400 text-xs line-through">{item.old}</Text>
                      </View>
                    </View>
                    <Pressable onPress={() => navigation?.navigate('PackageDetail')} className="flex-row items-center bg-[#0f766e] px-4 py-3 rounded-2xl gap-1.5">
                      <Text className="text-white text-xs font-bold">Explore Package</Text>
                      <ArrowRight size={15} color="#fff" />
                    </Pressable>
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        />
        <View className="flex-row justify-center gap-1.5 mt-3">
          {(slides.length ? slides : SLIDES).map((_, idx) => (
            <View key={idx} className={`h-1.5 rounded-full ${slide === idx ? 'w-5 bg-teal-600' : 'w-1.5 bg-slate-300 dark:bg-zinc-700'}`} />
          ))}
        </View>
      </View>

      {/* 3. UPCOMING DEPARTURES */}
      <View className="px-4">
        <View className="flex-row justify-between items-end mb-3">
          <View>
            <Text className="text-[11px] font-extrabold tracking-widest text-teal-700 dark:text-teal-400">FAST SELLING</Text>
            <Text className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Upcoming Departures</Text>
          </View>
          <Pressable className="flex-row items-center">
            <Text className="text-xs font-bold text-teal-700 dark:text-teal-400">View Calendar</Text>
            <ChevronRight size={15} color={isDark ? '#2dd4bf' : '#0f766e'} />
          </Pressable>
        </View>

        <View className={`rounded-3xl p-3.5 border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
          <View className={`flex-row p-1 rounded-2xl mb-3 ${isDark ? 'bg-zinc-950' : 'bg-slate-100'}`}>
            {DEP_TABS.map(t => (
              <Pressable
                key={t}
                onPress={() => setDepTab(t)}
                className={`flex-1 py-2.5 rounded-xl items-center ${depTab === t ? (isDark ? 'bg-teal-600' : 'bg-[#0B172A]') : ''}`}
              >
                <Text className={`text-[11px] font-bold ${depTab === t ? 'text-white' : isDark ? 'text-zinc-400' : 'text-slate-600'}`}>{t}</Text>
              </Pressable>
            ))}
          </View>

          <View className="gap-2.5">
            {batches.map(b => (
              <Pressable key={b.id} onPress={() => navigation?.navigate('PackageDetail')} className={`flex-row justify-between items-center p-3 rounded-2xl ${isDark ? 'bg-zinc-800' : 'bg-slate-50'}`}>
                <View className="flex-row items-center flex-1 pr-2 gap-3">
                  <View className={`w-12 h-12 rounded-xl items-center justify-center ${isDark ? 'bg-zinc-900' : 'bg-blue-50'}`}>
                    <Text className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{b.d}</Text>
                    <Text className="text-[9px] font-extrabold text-slate-500">{b.m}</Text>
                  </View>
                  <View className="flex-1">
                    <Text numberOfLines={1} className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{b.title}</Text>
                    <Text numberOfLines={1} className="text-[11px] text-slate-500 mt-0.5">{b.sub}</Text>
                  </View>
                </View>

                <View className="items-end">
                  <View className={`px-2.5 py-1 rounded-full ${b.urgent ? 'bg-red-100 dark:bg-red-950' : 'bg-emerald-100 dark:bg-emerald-950'}`}>
                    <Text className={`text-[10px] font-bold ${b.urgent ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}`}>{b.seats}</Text>
                  </View>
                  <Text className={`text-xs font-extrabold mt-1.5 ${isDark ? 'text-zinc-200' : 'text-slate-700'}`}>{b.price}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
