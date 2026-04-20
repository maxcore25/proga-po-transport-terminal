export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:8888';
export const BASE_API_URL = `${BASE_URL}/api/v1`;

export const QUERY_KEYS = {
  USER: 'USER',
  USERS: 'USERS',
  USER_ME: 'USER_ME',
  BRANCH: 'BRANCH',
  BRANCHES: 'BRANCHES',
  CARD: 'CARD',
  CARDS: 'CARDS',
  KEY: 'KEY',
  KEYS: 'KEYS',
} as const;

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
} as const;

export const roles = ['admin', 'user'] as const;
export type Role = (typeof roles)[number];
