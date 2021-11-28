export const COMPANIES_API = '/companies';
export const COMPANIES_BY_ID_API = (id: string): string => `${COMPANIES_API}/${id}`;

export const SIGN_IN_API = '/auth/sign-in';
export const SIGN_OUT_API = '/auth/sign-out';

// export const SEND_FEEDBACK_API = '/feedback';
// export const SEND_FEEDBACK_IMAGES_API = `${SEND_FEEDBACK_API}/images`;
export const CHATS_API = '/chats';
export const ME_API = '/managers/me';
