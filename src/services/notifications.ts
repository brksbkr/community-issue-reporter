import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function setupNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reports', {
      name: 'Report Notifications',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  const currentPermissions = await Notifications.getPermissionsAsync();

  if (currentPermissions.status !== 'granted') {
    const requestedPermissions =
      await Notifications.requestPermissionsAsync();

    return requestedPermissions.status === 'granted';
  }

  return true;
}

export async function sendReportNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Report Submitted',
      body: 'Your community issue was submitted successfully.',
      sound: true,
    },
    trigger: null,
  });
}