import { axiosInstance } from '@/shared/api';
import { CreateBranchValues } from '../model/create-branch.schema';

export const createBranch = async (payload: CreateBranchValues) => {
  const { data } = await axiosInstance.post('/branches', payload);
  return data;
};
