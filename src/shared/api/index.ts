import { BASE_API_URL, LOCAL_STORAGE_KEYS } from '@/shared/config';
import axios from 'axios';

type Tokens = {
  accessToken: string;
};

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

const plainAxios = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

function getAccessToken() {
  return typeof window !== 'undefined'
    ? localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
    : null;
}

function setAccessToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
  }
}

export function clearAuthTokens() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }
}

function redirectToPublicRout() {
  if (typeof window !== 'undefined') {
    clearAuthTokens();
    window.location.href = '/login';
  }
}

const refreshTokens = async () => {
  const response = await plainAxios.post<Tokens>('/auth/refresh');
  return response.data;
};

let isRefreshing = false;
let refreshPromise: Promise<Tokens> | null = null;
let subscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  subscribers.push(cb);
}

function onRefreshed(token: string) {
  subscribers.forEach(cb => cb(token));
  subscribers = [];
}

function handleTokenRefresh(): Promise<Tokens> {
  if (!refreshPromise) {
    refreshPromise = refreshTokens()
      .then(tokens => {
        setAccessToken(tokens.accessToken);
        onRefreshed(tokens.accessToken);
        return tokens;
      })
      .catch(err => {
        subscribers = [];
        redirectToPublicRout();
        throw err;
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login')
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
      }

      try {
        const newAccessToken = await new Promise<string>((resolve, reject) => {
          subscribeTokenRefresh(resolve);
          handleTokenRefresh().catch(reject);
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
