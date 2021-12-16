import { SUBSCRIPTION_API } from '@constants/api.constants';
import { post } from '@helpers/axios.helpers';

interface IPostSubscriptionResponseDTO {
  subscriptionId: string;
}
export function postSubscription(body: PushSubscription): Promise<IPostSubscriptionResponseDTO> {
  return post(SUBSCRIPTION_API, body);
}
