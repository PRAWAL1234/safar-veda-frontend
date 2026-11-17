import React, { useState } from 'react';
import { View, Text, ImageBackground, Pressable, useWindowDimensions, useColorScheme } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate, Extrapolation } from 'react-native-reanimated';
import { Heart, Star, Clock, TrainFront, Headphones, BadgePercent, Navigation, Sparkles } from 'lucide-react-native';

const TOURS = [
  { id: '1', badge: 'Only 5 seats left!', rating: '4.9', reviews: '420', dur: '8D / 8N', hub: 'Delhi Ex', title: 'Magical Himachal Group Tour', route: 'Shimla • Kullu • Manali • Solang Valley', price: '₹18,499', img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=800&q=80' },
  { id: '2', badge: 'Cultural Classic', rating: '4.8', reviews: '310', dur: '6D / 5N', hub: 'Jaipur Ex', title: 'Royal Rajasthan Heritage Tour', route: 'Jaipur • Udaipur • Jodhpur • Jaisalmer', price: '₹22,999', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80' },
  { id: '3', badge: 'Best Seller', rating: '4.9', reviews: '290', dur: '5D / 4N', hub: 'Kochi Ex', title: 'Kerala Backwater Escape Tour', route: 'Munnar • Thekkady • Alleppey Houseboat', price: '₹16,499', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80' },
];

const PROMISES = [
  { id: '1', title: '24/7 AI + Human Lead', desc: 'Round-the-clock coordinator on ground.', icon: Headphones, bg: 'bg-teal-100 dark:bg-teal-950', color: '#0f766e' },
  { id: '2', title: 'Zero Hidden Fees', desc: 'Transparent fares, taxes and all permits included.', icon: BadgePercent, bg: 'bg-amber-100 dark:bg-amber-950', color: '#d97706' },
  { id: '3', title: 'Live GPS Tracking', desc: 'Real-time vehicle and trail check-ins for safety.', icon: Navigation, bg: 'bg-indigo-100 dark:bg-indigo-950', color: '#4f46e5' },
  { id: '4', title: 'Boutique Stays Only', desc: 'Verified heritage havelis & handpicked villas.', icon: Sparkles, bg: 'bg-emerald-100 dark:bg-emerald-950', color: '#059669' },
];

function TiltTourCard({ item, index, scrollX, cardW, gap, isDark, onPress }: any) {
  const step = cardW + gap;
  const animStyle = useAnimatedStyle(() => {
    const input = [(index - 1) * step, index * step, (index + 1) * step];
    const rotateY = interpolate(scrollX.value, input, [8, 0, -8], Extrapolation.CLAMP);
    const scale = interpolate(scrollX.value, input, [0.97, 1, 0.97], Extrapolation.CLAMP);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }, { scale }],
    };
  });

  return (
    <Animated.View style={[{ width: cardW }, animStyle]} className={`rounded-3xl overflow-hidden border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <ImageBackground source={{ uri: item.img }} imageStyle={{ borderRadius: 24 }} className="h-44 p-3 justify-between bg-slate-800">
        <View className="flex-row justify-between items-center">
          <View className="bg-rose-100 px-3 py-1 rounded-full">
            <Text className="text-[11px] font-extrabold text-rose-700">{item.badge}</Text>
          </View>
          <Pressable className="w-8 h-8 rounded-full bg-white/90 items-center justify-center">
            <Heart size={15} color="#0f172a" />
          </Pressable>
        </View>
        <View className="self-start flex-row items-center bg-white/95 px-2.5 py-1 rounded-full gap-1">
          <Star size={12} color="#f59e0b" fill="#f59e0b" />
          <Text className="text-[11px] font-extrabold text-slate-900">{item.rating}</Text>
          <Text className="text-[10px] text-slate-500">({item.reviews})</Text>
        </View>
      </ImageBackground>

      <View className="p-4">
        <View className="flex-row items-center gap-2 mb-1.5">
          <Clock size={12} color="#64748b" />
          <Text className="text-[11px] font-semibold text-slate-500">{item.dur}</Text>
          <Text className="text-slate-400">•</Text>
          <TrainFront size={12} color="#64748b" />
          <Text className="text-[11px] font-semibold text-slate-500">{item.hub}</Text>
        </View>
        <Text numberOfLines={1} className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</Text>
        <Text numberOfLines={1} className="text-xs text-slate-500 mt-0.5 mb-3.5">{item.route}</Text>

        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-[10px] text-slate-400 font-medium">Per person</Text>
            <Text className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.price}</Text>
          </View>
          <Pressable onPress={onPress} className="bg-[#0B172A] dark:bg-teal-600 px-5 py-2 rounded-full">
            <Text className="text-white text-sm font-bold">View Tour</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

export default function TrendingAndPromiseSection({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const { width } = useWindowDimensions();
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollX = useSharedValue(0);

  const innerPadding = 12;
  const gap = 10;
  // Parent box frame width = width - 32 (due to outer px-4).
  // Inside parent box, card takes full inner width so each card fits the parent card frame cleanly:
  const cardW = width - 32 - (innerPadding * 2);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => { scrollX.value = e.contentOffset.x; },
  });

  return (
    <View className="w-full gap-6 pb-32">
      {/* 1. TRENDING GROUP TOURS (Framed 3D Tilt Carousel Box) */}
      <View className="px-4">
        <View className="flex-row justify-between items-end mb-3">
          <View>
            <Text className="text-[11px] font-extrabold tracking-widest text-teal-700 dark:text-teal-400">TOP RATED</Text>
            <Text className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Trending Group Tours</Text>
          </View>
          <Text className="text-xs font-semibold text-slate-500">Swipe to see all</Text>
        </View>

        {/* React Bits Style Outer Box Frame */}
        <View className={`rounded-3xl py-4 border ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-100/80 border-slate-200/80'}`}>
          <Animated.FlatList
            data={TOURS}
            keyExtractor={(i) => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardW + gap}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: innerPadding, gap }}
            onScroll={onScroll}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(e) => setActiveIdx(Math.round(e.nativeEvent.contentOffset.x / (cardW + gap)))}
            renderItem={({ item, index }) => (
              <TiltTourCard
                item={item}
                index={index}
                scrollX={scrollX}
                cardW={cardW}
                gap={gap}
                isDark={isDark}
                onPress={() => navigation?.navigate('PackageDetail')}
              />
            )}
          />

          {/* Dots Indicator */}
          <View className="flex-row justify-center gap-1.5 mt-4">
            {TOURS.map((_, i) => (
              <View key={i} className={`h-1.5 rounded-full ${activeIdx === i ? 'w-5 bg-[#0B172A] dark:bg-teal-400' : 'w-1.5 bg-slate-300 dark:bg-zinc-700'}`} />
            ))}
          </View>
        </View>
      </View>

      {/* 2. THE SAFARVEDA PROMISE (2x2 Grid) */}
      <View className="px-4">
        <Text className="text-[11px] font-extrabold tracking-widest text-teal-700 dark:text-teal-400">THE SAFARVEDA PROMISE</Text>
        <Text className={`text-xl font-extrabold mb-3.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Why Discerning Travelers Choose Us</Text>

        <View className="flex-row flex-wrap justify-between gap-y-3">
          {PROMISES.map((p) => {
            const Icon = p.icon;
            return (
              <View key={p.id} style={{ width: '48.2%' }} className={`p-4 rounded-3xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200/70 shadow-sm'}`}>
                <View className={`w-10 h-10 rounded-xl items-center justify-center mb-3 ${p.bg}`}>
                  <Icon size={18} color={p.color} />
                </View>
                <Text className={`text-sm font-extrabold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.title}</Text>
                <Text className="text-[11px] text-slate-500 leading-4">{p.desc}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
