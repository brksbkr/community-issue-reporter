import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import SubmitReportScreen from './src/screens/SubmitReportScreen';
import ReportMapScreen from './src/screens/ReportMapScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import { RootStackParamList } from './src/navigationTypes';
import { setupNotifications } from './src/services/notifications';
import { COLORS, navigationTheme } from './src/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="light" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.accent,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Community Issue Reporter' }}
        />

        <Stack.Screen
          name="SubmitReport"
          component={SubmitReportScreen}
          options={{ title: 'Submit a Report' }}
        />

        <Stack.Screen
          name="ReportMap"
          component={ReportMapScreen}
          options={{ title: 'Issue Map' }}
        />

        <Stack.Screen
          name="Reports"
          component={ReportsScreen}
          options={{ title: 'Submitted Reports' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}