import { useMutation } from '@tanstack/react-query';
import { login } from '../api/login.api';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
