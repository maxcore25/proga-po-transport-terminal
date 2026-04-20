import { axiosInstance } from '@/shared/api';
import { branchesSchema } from '../model/branch.schema';

export async function getBranches() {
  const { data } = await axiosInstance.get('/branches');
  return branchesSchema.parse(data);
}
