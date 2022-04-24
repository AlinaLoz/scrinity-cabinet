export enum ROUTES {
  INDEX = '/',
  SIGN_IN = '/sign-in',
  ERROR_404 = '404',
  MESSAGES = '/messages',
  GRAPHICS = '/graphics',
  CHAT = '/chat',
  FEEDBACKS = '/feedbacks',
}

export const COMPANY_ROUTE = (company: string, route: ROUTES): string => `/${company}${route}`;
export const COMPANY_CHAT_ROUTE = (company: string): string => `/${company}${ROUTES.CHAT}`;
