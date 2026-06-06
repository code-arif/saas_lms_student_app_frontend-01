import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../hooks/useAuth';
import { LoginCredentials } from '../types/auth.types';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginForm = () => {
  const { login, isLoggingIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => login(data))} className="space-y-4">
      <div>
        <input {...register('email')} placeholder="Email" className="w-full p-2 border rounded" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isLoggingIn} className="w-full p-2 bg-blue-600 text-white rounded">
        {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
