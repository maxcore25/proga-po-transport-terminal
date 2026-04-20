import { QUERY_KEYS } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import { getTutors } from '../api/get-tutors.api';

export function useGetTutors() {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, 'tutor'],
    queryFn: getTutors,
  });
}
