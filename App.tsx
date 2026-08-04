import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import SubmitReportScreen from './src/screens/SubmitReportScreen';
import ReportMapScreen from './src/screens/ReportMapScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import { RootStackParamList } from './src/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#245c45',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
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