import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../../components/Navbar/BottamNav';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserMenu } from '@/components/user-menu';

type MainLayoutProps = {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  onLogout?: () => void;
};
const Stack = createNativeStackNavigator();

function MainLayout() {
  return (
    <SafeAreaView
      className="flex-1 bg-slate-50 dark:bg-zinc-950"
      edges={['top']}
    >
      <BottomNavigation />
    </SafeAreaView>
  );
}

// 2. Root Navigator (Native Stack)
export default function RootNavigator({ onLogout }: MainLayoutProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main Bottom Tabs */}
      <Stack.Screen
        name="MainTabs"
        component={MainLayout}
        options={{
          headerLeft: () => <></>,
          headerRight: () => (
            <View className="flex-1 items-center justify-center">
              <UserMenu />
            </View>
          ),
        }}
      />

      {/* Nested Screens (Inpar Back Button + Screen Name Header dikhega) */}
      {/* <Stack.Screen name="PackageDetail" component={PackageDetailScreen} /> */}
      {/* <Stack.Screen name="BookingFlow" component={BookingFlowScreen} /> */}
    </Stack.Navigator>
  );
}
