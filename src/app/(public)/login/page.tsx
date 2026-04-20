import { LoginPage } from '@/_pages/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Логин',
};

export default function LoginRoute() {
  return <LoginPage />;
}
