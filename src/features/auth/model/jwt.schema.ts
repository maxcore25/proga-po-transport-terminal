import { roles } from '@/shared/config';
import { z } from 'zod';

export const jwtPayloadSchema = z.object({
  sub: z.uuid(),
  exp: z.number(),
  iat: z.number(),
  role: z.enum(roles),
});

export type JWTPayload = z.infer<typeof jwtPayloadSchema>;
