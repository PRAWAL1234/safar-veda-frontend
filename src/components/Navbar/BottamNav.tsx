import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { Home, Briefcase, User, Compass } from 'lucide-react-native';
import HomeScreen from '../../pages/Home';
import ExploreScreen from '../../pages/ExploreScreen/index';
import MyTripsScreen from '../../pages/MyTripsScreen/index';
import ProfileScreen from '../../pages/Profile/ProfileScreen';



// Custom Liquid Glass Tab Bar (Exact Image Layout)
function LiquidGlassTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const isDark = useColorScheme() === 'dark';

  // First 3 routes left pill mein jayenge, 4th route (Search) right circle mein
  const mainRoutes = state.routes.slice(0, 3);
  const searchRoute = state.routes[3];
  const isSearchFocused = state.index === 3;

  return (
    <View className="absolute bottom-6 left-4 right-4 flex-row items-center gap-3">
      {/* LEFT MAIN FLOATING PILL */}
      <View
        className={`flex-1 flex-row items-center justify-between p-1.5 rounded-full border shadow-lg ${
          isDark
            ? 'bg-zinc-900/90 border-zinc-800 shadow-black/50'
            : 'bg-white/95 border-slate-200/80 shadow-slate-300/60'
        }`}
      >
        {mainRoutes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Icons & Notification Badge Setup
          const activeColor = '#0f766e';
          const inactiveColor = isDark ? '#e4e4e7' : '#18181b';

          const renderIcon = () => {
            const color = isFocused ? activeColor : inactiveColor;
            if (route.name === 'Home')
              return <Home size={22} color={color} strokeWidth={2.2} />;
            if (route.name === 'Explore')
              return <Compass size={22} color={color} strokeWidth={2.2} />;
            if (route.name === 'MyTrips')
              return <Briefcase size={22} color={color} strokeWidth={2.2} />;
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className={`flex-1 items-center justify-center py-2.5 rounded-full ${
                isFocused
                  ? isDark
                    ? 'bg-zinc-800/90'
                    : 'bg-slate-200/70'
                  : 'bg-transparent'
              }`}
            >
              {/* Icon + Optional Red Notification Badge */}
              <View className="relative">
                {renderIcon()}
                {route.name === 'Bookings' && (
                  <View className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-teal-700 items-center justify-center">
                    <Text className="text-white text-[10px] font-bold leading-none">
                      1
                    </Text>
                  </View>
                )}
              </View>

              {/* Tab Label */}
              <Text
                className={`text-[11px] font-semibold mt-1 ${
                  isFocused
                    ? 'text-teal-700'
                    : isDark
                    ? 'text-zinc-200'
                    : 'text-zinc-900'
                }`}
              >
                {route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* RIGHT SEPARATE CIRCULAR SEARCH BUTTON */}
      {searchRoute && (
        <Pressable
          onPress={() => navigation.navigate(searchRoute.name)}
          className={`w-20 h-20 rounded-full items-center justify-center border shadow-lg active:scale-95 ${
            isSearchFocused
              ? 'bg-teal-700 border-teal-700'
              : isDark
              ? 'bg-zinc-900/90 border-zinc-800 shadow-black/50'
              : 'bg-white/95 border-slate-200/80 shadow-slate-300/60'
          }`}
        >
          <User
            size={24}
            color={isSearchFocused ? '#ffffff' : isDark ? '#ffffff' : '#18181b'}
            strokeWidth={2.2}
          />
          <Text className="text-white text-xs">Profile</Text>
        </Pressable>
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <LiquidGlassTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="MyTrips" component={MyTripsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
