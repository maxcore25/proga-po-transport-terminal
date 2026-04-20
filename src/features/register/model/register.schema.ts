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
// .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
//   message: 'At least one special character.',
// });

export const registerFormSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.email().trim(),
  password: passwordSchema,
});

export const registerResponseSchema = z.object({
  accessToken: z.string(),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
