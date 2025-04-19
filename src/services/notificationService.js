import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Set global notification behavior when a notification is received while the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,    // Show alert popup
    shouldPlaySound: true,    // Play notification sound
    shouldSetBadge: true,     // Update app icon badge count
  }),
});

// Request notification permissions and get Expo push token
export async function setupPushNotifications() {
  if (!Device.isDevice) {
    // Push notifications only work on real devices
    console.warn('Must use physical device for Push Notifications');
    return null;
  }

  // Check existing permission status
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // If not granted, request permissions from the user
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // If still not granted, exit
  if (finalStatus !== 'granted') {
    console.warn('Failed to get push token for push notification!');
    return null;
  }

  // Retrieve Expo push token
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Push notification token:', token);
  return token;
}

// Programmatically send a local notification
export async function sendNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,                 // Notification title
      body,                  // Notification body text
      sound: 'default',       // Play default notification sound
      priority: Notifications.AndroidNotificationPriority.HIGH, // Android-specific priority
    },
    trigger: null, // Send immediately (no delay)
  });
}