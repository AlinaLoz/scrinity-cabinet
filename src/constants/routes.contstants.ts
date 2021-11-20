export enum ROUTES {
  SIGN_IN = 'sign-in',
  ERROR_404 = '404',
  MESSAGES = 'messages',
  GRAPHICS = 'graphics',
  CHAT = 'chat',
}

export const IS_INDEX_PATH = (company: string, asPath: string): boolean => asPath === `/${company}/`;
export const COMPANY_ROUTE = (company: string, route: ROUTES): string => `/${company}/${route}`;
export const COMPANY_CHAT_ROUTE = (company: string, feedbackId: number): string => `/${company}/${ROUTES.CHAT}?id=${feedbackId}`;
