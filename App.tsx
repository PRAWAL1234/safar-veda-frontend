/**
 * SafarVeda React Native App
 * Navigation switcher between Splash, Onboarding, Login, and Main App
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { NavigationContainer } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';

import SplashScreen from './src/components/SplashScreen';
import OnboardingScreen from './src/pages/Onboarding';
import LoginPage from './src/pages/Auth/Login';
import RootNavigator from './src/pages/layout/MainLayout';

export type AppScreen = 'splash' | 'onboarding' | 'login' | 'main';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError(error) {
        console.error('GLOBAL QUERY ERROR', error);
      },
    }),
    mutationCache: new MutationCache({
      onError(error) {
        console.error('GLOBAL MUTATION ERROR', error);
      },
    }),
  });

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen onAnimationComplete={() => setCurrentScreen('login')} />
        );

      case 'onboarding':
        return (
          <OnboardingScreen onComplete={() => setCurrentScreen('login')} />
        );

      case 'login':
        return (
          <LoginPage
            onLoginSuccess={() => setCurrentScreen('main')}
            onNavigateToOnboarding={() => setCurrentScreen('onboarding')}
          />
        );

      case 'main':
        return <RootNavigator onLogout={() => setCurrentScreen('login')} />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>{renderCurrentScreen()}</NavigationContainer>
        <PortalHost />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
