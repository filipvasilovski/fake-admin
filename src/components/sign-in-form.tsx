'use client';

// import * as actions from "@/actions"
// import { usedPasswordsStore } from "@/store/used-password"
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useAuth } from '@/hooks/use-auth';

import { SignIn, signInSchema } from '@/lib/schemas';

import { AUTH_STATUS } from '@/config/constants';

export function SignInForm() {
  const navigate = useNavigate();
  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { login, setUser, setStatus } = useAuth();

  // const { addPassword } = usedPasswordsStore()

  async function onSubmit(values: SignIn) {
    try {
      const response = await login(values.email, values.password);

      setUser({
        id: '1',
        email: response.data.data.email,
        accessToken: response.data.data.access_token,
      });

      setStatus(AUTH_STATUS.authenticated);

      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        form.setError(error.response?.data.data[0].Param.toLowerCase(), {
          message: error.response?.data.data[0].Message,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="admin@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
