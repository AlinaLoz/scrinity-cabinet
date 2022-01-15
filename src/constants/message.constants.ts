export const MESSAGE_MAP = {
  UNKNOWN_ERROR: 'Неизвестая ошибка',
  NOT_FOUND: 'Не найден',
  INVALID_PASSWORD: 'Неверный пароль',
  IMAGE_TOO_LARGE: 'IMAGE_TOO_LARGE',
  INVALID_IMAGES_FORMAT: 'INVALID_IMAGES_FORMAT',
} as const;

export enum SENDER_FILTER {
  all= 'all',
  anonymously = 'anonymously',
  byNumber = 'byNumber',
  byEmail = 'byEmail',
}

export const SENDER_FILTER_OPTIONS = [
  { key: SENDER_FILTER.all, value: 'Все' },
  { key: SENDER_FILTER.anonymously, value: 'Анонимно' },
  { key: SENDER_FILTER.byNumber, value: 'По номеру' },
  { key: SENDER_FILTER.byEmail, value: 'По email' },
];

export const PAGE_SIZE = 20;
