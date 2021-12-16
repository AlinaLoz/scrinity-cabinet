import config from '@utils/config';

/* eslint-disable */
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
/* eslint-enable */

export function isPushNotificationSupported(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

export async function getSubscriptionObject(): Promise<PushSubscription> {
  await navigator.serviceWorker.register('/sw.js');
  const serviceWorker = await navigator.serviceWorker.ready;
  return serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(config.PUBLIC_VAPID_KEY),
  });
}

export async function askUserPermission(): Promise<NotificationPermission | null> {
  if (window.Notification) {
    return Notification.requestPermission();
  }
  return null;
}
