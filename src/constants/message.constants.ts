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
  nonAnonymously = 'nonAnonymously',
}

export const SENDER_FILTER_OPTIONS = [
  { key: SENDER_FILTER.all, value: 'Все' },
  { key: SENDER_FILTER.anonymously, value: 'Без номера' },
  { key: SENDER_FILTER.nonAnonymously, value: 'С номером' },
];

export const PAGE_SIZE = 20;
