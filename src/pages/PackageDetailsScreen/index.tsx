import { AppHeader } from '@/components/Navbar/AppHeader';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PackageDetailScreen = () => {
  return (
    <SafeAreaView
      className="flex-1 bg-slate-50 dark:bg-zinc-950"
      edges={['top']}
    >
      <AppHeader isNested title={'Trip Detail'} />
      {/* Yahan Himachal Expedition ki details */}
    </SafeAreaView>
  );
};

export default PackageDetailScreen;
