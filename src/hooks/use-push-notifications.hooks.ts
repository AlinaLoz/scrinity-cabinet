import { useEffect } from 'react';
import {
  askUserPermission, getSubscriptionObject,
  isPushNotificationSupported,
} from '@utils/service-worker';
import { postSubscription } from '@api/subscriptions.service';

export function usePushNotifications() {
  useEffect(() => {
    (async () => {
      if (!isPushNotificationSupported()) return;
      const permission = await askUserPermission();
      if (permission === 'granted') {
        try {
          const existingSubscription = await getSubscriptionObject();
          if (existingSubscription) {
            await postSubscription(existingSubscription);
          }
        } catch (err) {
          console.log('err', err);
        }
      }
    })();
  }, []);
}
