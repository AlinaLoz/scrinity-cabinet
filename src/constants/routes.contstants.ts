export enum ROUTES {
  INDEX = '/',
  SIGN_IN = '/sign-in',
  ERROR_404 = '404',
  MESSAGES = '/messages',
  GRAPHICS = '/graphics',
  CHAT = '/chat',
}

export const COMPANY_ROUTE = (company: string, route: ROUTES): string => `/${company}${route}`;
export const COMPANY_CHAT_ROUTE = (company: string, feedbackId: number): string => `/${company}${ROUTES.CHAT}?id=${feedbackId}`;
