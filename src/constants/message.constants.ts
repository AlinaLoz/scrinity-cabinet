export const MESSAGE_MAP = {
  UNKNOWN_ERROR: 'Неизвестая ошибка',
  NOT_FOUND: 'Не найден',
  INVALID_PASSWORD: 'Неверный пароль',
  IMAGE_TOO_LARGE: 'IMAGE_TOO_LARGE',
  INVALID_IMAGES_FORMAT: 'INVALID_IMAGES_FORMAT',
} as const;

export enum MESSAGE_FILTER {
  all= 'all',
  anonymously = 'anonymously',
  nonAnonymously = 'nonAnonymously',
}

export const FILTER_OPTIONS = [
  { key: MESSAGE_FILTER.all, value: 'Все' },
  { key: MESSAGE_FILTER.anonymously, value: 'Анонимно' },
  { key: MESSAGE_FILTER.nonAnonymously, value: 'Неанонимно' },
];

export const PAGE_SIZE = 20;
