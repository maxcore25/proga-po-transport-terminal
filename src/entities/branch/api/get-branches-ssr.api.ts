import { BASE_API_URL } from '@/shared/config';
import { branchesSchema } from '../model/branch.schema';

export async function getBranchesSSR() {
  const res = await fetch(`${BASE_API_URL}/branches`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch branches');

  const data = await res.json();
  return branchesSchema.parse(data);
}
