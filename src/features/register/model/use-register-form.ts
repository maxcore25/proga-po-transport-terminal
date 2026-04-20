import { LOCAL_STORAGE_KEYS } from '@/shared/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { registerFormSchema, RegisterFormValues } from './register.schema';
import { useRegister } from './use-register';

export const useRegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: '',
      username: '',
      password: '',
    },
  });
  const { mutate, isPending } = useRegister();

  function onSubmit(values: RegisterFormValues) {
    mutate(values, {
      onSuccess: data => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
        form.reset();
        router.push('/home');
      },
      onError: error => {
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
