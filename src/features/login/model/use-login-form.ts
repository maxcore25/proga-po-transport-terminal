import { decodePayload } from '@/features/auth/lib/utils';
import { LOCAL_STORAGE_KEYS } from '@/shared/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { loginFormSchema, LoginFormValues } from './login.schema';
import { useLogin } from './use-login';

export const useLoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, isPending } = useLogin();

  function onSubmit(values: LoginFormValues) {
    mutate(values, {
      onSuccess: data => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);

        const payload = decodePayload(data.accessToken);
        const role = payload?.role;

        form.reset();

        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/home');
        }
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Something went wrong', {
          description: 'Please try again.',
          action: {
            label: 'Close',
            onClick: () => null,
          },
        });

        console.error(error);
      },
    });
  }

  return { form, onSubmit, ...form, isPending };
};
