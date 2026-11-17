import React, { useState } from 'react';
import { Compass, Search, X } from 'lucide-react-native';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../API/useAPI';


const SearchInput = () => {
  const isDark = useColorScheme() === 'dark';
  const { width, height } = useWindowDimensions();
  const isVertical = width > height;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // TanStack Query Boilerplate for Live Search
  const { data, isLoading, isError } = useQuery({
    queryKey: ['searchDestinations', searchQuery],
    queryFn: async () => {
      const response = await apiClient.get('/packages/search', {
        params: { q: searchQuery },
      });
      return response.data;
    },
    // Modal khula ho aur user ne kam se kam 2 letters type kiye hon tabhi API call hogi
    enabled: isModalOpen && searchQuery.trim().length >= 2,
  });

  return (
    <>
      {/* 1. TRIGGER SEARCH BAR (Click karne par Modal khulega) */}
      <Pressable
        onPress={() => setIsModalOpen(true)}
        className={`w-full rounded-2xl border ${
          isVertical
            ? 'flex-col items-stretch p-3.5 gap-3'
            : 'flex-row items-center px-3.5 py-2 gap-2.5'
        } ${
          isDark
            ? 'bg-zinc-900 border-zinc-800 shadow-black/40'
            : 'bg-white border-slate-200/80 shadow-sm shadow-slate-200'
        }`}
      >
        <View className="flex-row items-center flex-1 gap-2.5">
          <Compass
            size={20}
            color={isDark ? '#2dd4bf' : '#0f766e'}
            strokeWidth={2.2}
          />
          <Text
            numberOfLines={1}
            className={`flex-1 text-sm font-medium ${
              isDark ? 'text-zinc-500' : 'text-slate-400'
            }`}
          >
            {searchQuery || 'Search destination, tour code, or vibe...'}
          </Text>
        </View>

        <View className={isVertical ? 'flex-row justify-end' : ''}>
          <View
            className={`w-10 h-10 rounded-xl items-center justify-center ${
              isDark ? 'bg-zinc-800' : 'bg-slate-100'
            }`}
          >
            <Search size={18} color={isDark ? '#fff' : '#000'} />
          </View>
        </View>
      </Pressable>

      {/* 2. FULL-SCREEN SEARCH MODAL */}
      <Modal
        visible={isModalOpen}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <SafeAreaView
          className={`flex-1 ${isDark ? 'bg-zinc-950' : 'bg-slate-50'}`}
        >
          {/* Modal Top Search Header */}
          <View
            className={`flex-row items-center px-4 py-3 gap-3 border-b ${
              isDark
                ? 'bg-zinc-900 border-zinc-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <Search size={20} color={isDark ? '#2dd4bf' : '#0f766e'} />

            <TextInput
              autoFocus
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Type destination, tour code..."
              placeholderTextColor={isDark ? '#71717a' : '#94a3b8'}
              className={`flex-1 text-base font-medium h-10 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            />

            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} className="p-1">
                <X size={18} color={isDark ? '#a1a1aa' : '#64748b'} />
              </Pressable>
            )}

            <Pressable
              onPress={() => setIsModalOpen(false)}
              className="pl-2 py-1"
            >
              <Text className="text-sm font-bold text-teal-700 dark:text-teal-400">
                Close
              </Text>
            </Pressable>
          </View>

          {/* Modal Results Area (TanStack Query States) */}
          <View className="flex-1 px-4 pt-4">
            {isLoading && (
              <ActivityIndicator
                size="large"
                color={isDark ? '#2dd4bf' : '#0f766e'}
                className="mt-10"
              />
            )}

            {isError && (
              <Text className="text-center text-red-500 mt-10 font-medium">
                Failed to load results. Please try again.
              </Text>
            )}

            {/* API Data List */}
            <FlatList
              data={data?.results || []} // Apne API response structure ke hisaab se adjust karein
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setIsModalOpen(false);
                    // TODO: Navigate to PackageDetail with item
                  }}
                  className={`p-4 mb-2.5 rounded-2xl border ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-800'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <Text
                    className={`font-bold text-base ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </Text>
                  <Text
                    className={`text-xs mt-1 ${
                      isDark ? 'text-zinc-400' : 'text-slate-500'
                    }`}
                  >
                    {item.location}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default SearchInput;
