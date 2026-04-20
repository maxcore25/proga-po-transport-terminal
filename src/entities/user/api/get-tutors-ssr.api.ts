import { BASE_API_URL } from '@/shared/config';
import { usersSchema } from '../model/user.schema';

export async function getTutorsSSR() {
  const url = `${BASE_API_URL}/users?role=tutor`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch tutors');

  const data = await res.json();
  return usersSchema.parse(data);
}
