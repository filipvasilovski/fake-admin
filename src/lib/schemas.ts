import { object, string, z } from 'zod';

export const signInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .max(4, 'Password cannot exceed 4 characters'),
});

export type SignIn = z.infer<typeof signInSchema>;
