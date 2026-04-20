import { RegisterPage } from '@/_pages/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Регистрация | CodeCraft',
};

export default function RegisterRoute() {
  return <RegisterPage />;
}
