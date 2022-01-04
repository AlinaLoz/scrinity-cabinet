export const COMPANIES_API = '/companies';
export const COMPANIES_BY_ID_API = (id: string): string => `${COMPANIES_API}/${id}`;

export const SIGN_IN_API = '/auth/sign-in';
export const SIGN_OUT_API = '/auth/sign-out';

export const CHATS_API = '/chats';
export const CHATS_MESSAGE_API = '/chats/message';
export const CHAT_BY_ID_API = (id: number): string => `/chats/${id}`;
export const SEND_CHATS_IMAGES_API = `${CHATS_API}/images`;
export const ME_API = '/managers/me';

export const SUBSCRIPTION_API = '/subscriptions';

export const ANALYTICS_API = '/analytics';
export const ANALYTICS_FEEDBACK_API = `${ANALYTICS_API}/feedback`;
