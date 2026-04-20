import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(6, 'Minimum 6 characters')
  .regex(/(?=.*[a-z])/, {
    message: 'At least one letter',
  })
  .regex(/(?=.*\d)/, {
    message: 'At least one digit',
  });

export const loginFormSchema = z.object({
  email: z.email().trim(),
  password: passwordSchema,
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
