import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
  View,
} from 'react-native';
import { SignInForm } from '@/components/sign-in-form';

type LoginPageProps = {
  onLoginSuccess?: () => void;
  onNavigateToOnboarding?: () => void;
};

const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToOnboarding,
}) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className={`flex-1 ${isDark ? 'bg-zinc-950' : 'bg-slate-50'}`}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center py-8 px-4 sm:px-6">
          <View className="w-full max-w-4xl">
            <SignInForm onSubmit={onLoginSuccess} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
