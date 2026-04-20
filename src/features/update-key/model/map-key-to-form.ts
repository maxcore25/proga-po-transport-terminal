import { Key } from '@/entities/key';
import { UpdateKeyFormValues } from './update-key.schema';

export function mapKeyToFormValues(key: Key): UpdateKeyFormValues {
  return {
    name: key.name,
    keyType: key.keyType,
    keyValue: key.keyValue,
    sector: key.sector,
    description: key.description ?? '',
    isActive: key.isActive,
  };
}
