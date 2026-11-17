import { SocialConnections } from '../components/social-connections';
import { Separator } from '../components/ui/separator';
import { Text } from '../components/ui/text';
import { Country, WORLD_COUNTRIES } from '@/data/countries';
import * as React from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Lock,
  ChevronDown,
  MessageSquareText,
  Compass,
  ShieldCheck,
  Bot,
  Search,
  X,
  Check,
} from 'lucide-react-native';
import Svg, { Circle, Polygon } from 'react-native-svg';

type SignInFormProps = {
  onSubmit?: () => void;
};

export function SignInForm({ onSubmit }: SignInFormProps) {
  const isDark = useColorScheme() === 'dark';
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [phone, setPhone] = React.useState('');
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(
    WORLD_COUNTRIES[0], // Default: India (+91)
  );
  const [modalVisible, setModalVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCountries = React.useMemo(() => {
    if (!searchQuery.trim()) return WORLD_COUNTRIES;
    const q = searchQuery.toLowerCase().trim();
    return WORLD_COUNTRIES.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.dial_code.includes(q) ||
        c.code.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setModalVisible(false);
    setSearchQuery('');
  };

  const handleSendOtp = () => {
    if (onSubmit) onSubmit();
  };

  /* -------------------------------------------------------------
   * 1. Brand Banner Hero Component
   * ----------------------------------------------------------- */
  const BrandHero = (
    <View
      className={`p-4 rounded-3xl overflow-hidden relative border ${
        isDark
          ? 'bg-[#0B2241] border-slate-800'
          : 'bg-[#0B2241] border-slate-900 shadow-lg'
      }`}
    >
      {/* Background Decorative Compass Watermark */}
      <View className="absolute -right-6 -top-6 opacity-15 pointer-events-none">
        <Svg width="180" height="180" viewBox="0 0 200 200">
          <Circle
            cx="100"
            cy="100"
            r="85"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="6 6"
            fill="none"
          />
          <Polygon
            points="100,20 118,78 180,78 130,115 148,175 100,138 52,175 70,115 20,78 82,78"
            fill="#94a3b8"
          />
        </Svg>
      </View>

      {/* Top Brand Header */}
      <View className="flex-row items-center mb-5">
        <View className="w-12 h-12 bg-white rounded-2xl items-center justify-center mr-3 shadow-sm">
          <View className="w-7 h-7 rounded-full bg-[#0f766e] items-center justify-center">
            <Compass size={16} color="#ffffff" />
          </View>
        </View>

        <View>
          <Text className="text-[11px] font-bold tracking-widest text-amber-300 uppercase">
            SAFARVEDA
          </Text>
          <Text className="text-xs font-medium text-slate-200 mt-0.5">
            Veda Luxury Journeys
          </Text>
        </View>
      </View>

      {/* Headline & Description */}
      <View className="mb-2">
        <Text className="text-white text-2xl font-bold tracking-tight">
          Begin Your Journey
        </Text>
        <Text className="text-slate-300 text-sm leading-5 mt-2">
          Curated heritage tours, live GPS guidance & your 24/7 travel buddy{' '}
          <Text className="text-amber-300 font-semibold">AI Mitra.</Text>
        </Text>
      </View>

      {/* Trust & Feature Badges */}
      <View className="flex-row items-center flex-wrap gap-2.5">
        <View className="flex-row items-center bg-[#06152B]/85 border border-slate-700/60 rounded-full px-3 py-1.5">
          <ShieldCheck size={14} color="#2dd4bf" />
          <Text className="text-white text-xs font-semibold ml-1.5">
            Verified Leads
          </Text>
        </View>

        <View className="flex-row items-center bg-[#06152B]/85 border border-slate-700/60 rounded-full px-3 py-1.5">
          <Bot size={14} color="#fbbf24" />
          <Text className="text-white text-xs font-semibold ml-1.5">
            AI Mitra Active
          </Text>
        </View>
      </View>
    </View>
  );

  /* -------------------------------------------------------------
   * 2. Trust Architecture Footer Section
   * ----------------------------------------------------------- */
  const TrustArchitecture = (
    <View className="w-full">
      <View
        className={`rounded-2xl p-4 border ${
          isDark
            ? 'bg-zinc-900/90 border-zinc-800'
            : 'bg-slate-100/90 border-slate-200/80 shadow-sm'
        }`}
      >
        <View className="flex-row items-center justify-between mb-3 px-1">
          <Text
            className={`text-[11px] font-bold tracking-wider uppercase ${
              isDark ? 'text-teal-400' : 'text-teal-800'
            }`}
          >
            TRUSTED TRAVEL ARCHITECTURE
          </Text>
          <Text
            className={
              isDark ? 'text-teal-400 text-sm' : 'text-teal-800 text-sm'
            }
          >
            ❂
          </Text>
        </View>

        <View className="flex-row justify-between gap-2">
          <View
            className={`flex-1 rounded-xl py-3 px-1 items-center border ${
              isDark
                ? 'bg-zinc-800/80 border-zinc-700/60'
                : 'bg-white border-slate-200/60 shadow-sm'
            }`}
          >
            <Text className="text-base mb-1">🪪</Text>
            <Text
              className={`text-[11px] font-bold text-center ${
                isDark ? 'text-zinc-100' : 'text-slate-800'
              }`}
            >
              100% Verified
            </Text>
            <Text
              className={`text-[10px] text-center mt-0.5 ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Tour Leads
            </Text>
          </View>

          <View
            className={`flex-1 rounded-xl py-3 px-1 items-center border ${
              isDark
                ? 'bg-zinc-800/80 border-zinc-700/60'
                : 'bg-white border-slate-200/60 shadow-sm'
            }`}
          >
            <Text className="text-base mb-1">🚆</Text>
            <Text
              className={`text-[11px] font-bold text-center ${
                isDark ? 'text-zinc-100' : 'text-slate-800'
              }`}
            >
              IRCTC Tourism
            </Text>
            <Text
              className={`text-[10px] text-center mt-0.5 ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Certified
            </Text>
          </View>

          <View
            className={`flex-1 rounded-xl py-3 px-1 items-center border ${
              isDark
                ? 'bg-zinc-800/80 border-zinc-700/60'
                : 'bg-white border-slate-200/60 shadow-sm'
            }`}
          >
            <Text className="text-base mb-1">🔒</Text>
            <Text
              className={`text-[11px] font-bold text-center ${
                isDark ? 'text-zinc-100' : 'text-slate-800'
              }`}
            >
              256-Bit SSL
            </Text>
            <Text
              className={`text-[10px] text-center mt-0.5 ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Encrypted
            </Text>
          </View>
        </View>
      </View>

      <Text
        className={`text-[11px] text-center mt-4 px-4 leading-4 ${
          isDark ? 'text-zinc-500' : 'text-slate-500'
        }`}
      >
        By proceeding, you agree to SafarVeda's{' '}
        <Text
          className={`font-semibold ${
            isDark ? 'text-teal-400' : 'text-teal-700'
          }`}
        >
          Terms of Service
        </Text>{' '}
        and acknowledge our{' '}
        <Text
          className={`font-semibold ${
            isDark ? 'text-teal-400' : 'text-teal-700'
          }`}
        >
          Privacy Policy
        </Text>
        .
      </Text>
    </View>
  );

  /* -------------------------------------------------------------
   * 3. Sign In Card Form
   * ----------------------------------------------------------- */
  const FormCard = (
    <View
      className={`w-full rounded-3xl p-4 border ${
        isDark
          ? 'bg-zinc-900 border-zinc-800 shadow-md shadow-black/40'
          : 'bg-white border-slate-200/80 shadow-md shadow-slate-200/60'
      }`}
    >
      {/* Header */}
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 pr-3">
          <Text
            className={`text-xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Sign in or Register
          </Text>
          <Text
            className={`text-xs mt-1 ${
              isDark ? 'text-zinc-400' : 'text-slate-500'
            }`}
          >
            Seamless OTP via WhatsApp or SMS
          </Text>
        </View>

        <View
          className={`w-10 h-10 rounded-full items-center justify-center ${
            isDark ? 'bg-teal-950/80' : 'bg-slate-100'
          }`}
        >
          <Lock size={18} color={isDark ? '#2dd4bf' : '#0f766e'} />
        </View>
      </View>

      {/* Input Label */}
      <Text
        className={`text-xs font-semibold mb-2 ${
          isDark ? 'text-zinc-300' : 'text-slate-700'
        }`}
      >
        Mobile Number
      </Text>

      {/* Input Row with Country Selector */}
      <View
        className={`flex-row items-center rounded-2xl px-3.5 h-14 mb-4 border ${
          isDark
            ? 'bg-zinc-800/90 border-zinc-700/80'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        {/* Country Code Trigger Button */}
        <Pressable
          onPress={() => setModalVisible(true)}
          className="flex-row items-center pr-2 py-2"
        >
          <Text className="text-lg mr-1">{selectedCountry.flag}</Text>
          <Text
            className={`text-sm font-semibold mr-1 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {selectedCountry.dial_code}
          </Text>
          <ChevronDown size={14} color={isDark ? '#a1a1aa' : '#64748b'} />
        </Pressable>

        {/* Divider */}
        <View
          className={`w-[1px] h-6 mx-2 ${
            isDark ? 'bg-zinc-700' : 'bg-slate-200'
          }`}
        />

        {/* Phone Input */}
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="98765 43210"
          placeholderTextColor={isDark ? '#71717a' : '#94a3b8'}
          keyboardType="phone-pad"
          maxLength={15}
          className={`flex-1 text-base font-medium ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        />
      </View>

      {/* Primary Action Button (Get OTP) */}
      <Pressable
        onPress={handleSendOtp}
        className="w-full h-13 py-3.5 rounded-2xl bg-[#0f766e] active:opacity-90 flex-row items-center justify-center mb-3 shadow-sm shadow-teal-900/30"
      >
        <Text className="text-white text-base font-bold mr-2">
          Get Secure OTP
        </Text>
        <MessageSquareText size={18} color="#ffffff" />
      </Pressable>

      {/* WhatsApp Pass Button */}
      <Pressable
        onPress={handleSendOtp}
        className={`w-full py-3 rounded-2xl active:opacity-80 flex-row items-center justify-center mb-5 border ${
          isDark
            ? 'bg-zinc-800/90 border-zinc-700/60'
            : 'bg-slate-50 border-slate-200/80'
        }`}
      >
        <MessageSquareText size={16} color={isDark ? '#2dd4bf' : '#0f766e'} />
        <Text
          className={`text-xs font-semibold ml-2 ${
            isDark ? 'text-teal-400' : 'text-[#0f766e]'
          }`}
        >
          Verify via WhatsApp instant pass
        </Text>
      </Pressable>

      {/* Divider */}
      <View className="flex-row items-center mb-5">
        <Separator className="flex-1" />
        <Text
          className={`px-3 text-xs ${
            isDark ? 'text-zinc-500' : 'text-slate-400'
          }`}
        >
          or explore with
        </Text>
        <Separator className="flex-1" />
      </View>

      {/* Social Providers */}
      <SocialConnections />
    </View>
  );

  return (
    <View className="w-full">
      {/* Responsive Layout: Landscape (2 Columns) vs Portrait (Vertical Stack) */}
      {isLandscape ? (
        <View className="flex-row items-start gap-6 w-full">
          {/* Left Column: Brand & Trust */}
          <View className="flex-1">
            {BrandHero}
            {TrustArchitecture}
          </View>

          {/* Right Column: Form */}
          <View className="flex-1">{FormCard}</View>
        </View>
      ) : (
        <View className="flex-col gap-5 w-full">
          {BrandHero}
          {FormCard}
          {TrustArchitecture}
        </View>
      )}

      {/* -------------------------------------------------------------
       * 4. Worldwide Country Code Selection Modal
       * ----------------------------------------------------------- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/60">
          <Pressable
            className="flex-1"
            onPress={() => setModalVisible(false)}
          />
          <View
            className={`w-full max-h-[80%] rounded-t-3xl p-5 border-t ${
              isDark
                ? 'bg-zinc-900 border-zinc-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Modal Header */}
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className={`text-lg font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Select Country Code
              </Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  isDark ? 'bg-zinc-800' : 'bg-slate-100'
                }`}
              >
                <X size={18} color={isDark ? '#e4e4e7' : '#475569'} />
              </Pressable>
            </View>

            {/* Country Search Bar */}
            <View
              className={`flex-row items-center rounded-xl px-3.5 h-12 mb-3 border ${
                isDark
                  ? 'bg-zinc-800/90 border-zinc-700'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Search size={16} color={isDark ? '#a1a1aa' : '#94a3b8'} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search country name or code..."
                placeholderTextColor={isDark ? '#71717a' : '#94a3b8'}
                className={`flex-1 ml-2 text-sm ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <X size={15} color={isDark ? '#a1a1aa' : '#94a3b8'} />
                </Pressable>
              )}
            </View>

            {/* Country List */}
            <FlatList
              data={filteredCountries}
              keyExtractor={item => item.code + item.dial_code}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => {
                const isSelected = selectedCountry.code === item.code;
                return (
                  <Pressable
                    onPress={() => handleSelectCountry(item)}
                    className={`flex-row items-center justify-between py-3.5 px-3 rounded-xl mb-1 ${
                      isSelected
                        ? isDark
                          ? 'bg-teal-950/60'
                          : 'bg-teal-50'
                        : isDark
                        ? 'active:bg-zinc-800/70'
                        : 'active:bg-slate-50'
                    }`}
                  >
                    <View className="flex-row items-center flex-1 mr-2">
                      <Text className="text-xl mr-3">{item.flag}</Text>
                      <Text
                        className={`text-sm font-medium flex-1 ${
                          isDark ? 'text-zinc-100' : 'text-slate-800'
                        }`}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text
                        className={`text-sm font-semibold mr-2 ${
                          isSelected
                            ? isDark
                              ? 'text-teal-400 font-bold'
                              : 'text-teal-700 font-bold'
                            : isDark
                            ? 'text-zinc-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {item.dial_code}
                      </Text>
                      {isSelected && (
                        <Check
                          size={16}
                          color={isDark ? '#2dd4bf' : '#0f766e'}
                        />
                      )}
                    </View>
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                <View className="py-8 items-center">
                  <Text
                    className={`text-sm ${
                      isDark ? 'text-zinc-400' : 'text-slate-500'
                    }`}
                  >
                    No country found matching "{searchQuery}"
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
