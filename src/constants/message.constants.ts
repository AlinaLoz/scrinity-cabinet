export const MESSAGE_MAP = {
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  INVALID_PHONE_NUMBER: 'INVALID_PHONE_NUMBER',
  REQUEST_CONFIRM_CODE_LIMIT: 'REQUEST_CONFIRM_CODE_LIMIT',
  CODE_NOT_FOUND: 'CODE_NOT_FOUND',
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
