import { axiosInstance } from '@/shared/api';
import { UpdateBranchValues } from '../model/update-branch.schema';

export const updateBranch = async (id: string, payload: UpdateBranchValues) => {
  const { data } = await axiosInstance.patch(`/branches/${id}`, payload);
  return data;
};
