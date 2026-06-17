import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { LoginCredentials } from '../types/auth.types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { cardVariants, formVariants, itemVariants } from '../constants/animations';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginForm = () => {
  const { login, isLoggingIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    login(data);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full max-w-md mx-auto shadow-xl shadow-black/5 dark:shadow-black/20">
        <CardHeader className="space-y-1.5 pb-4">
          <CardTitle className="text-xl font-semibold tracking-tight">Login</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute inset-y-0 right-1.5 z-10 rounded-md border-none bg-transparent text-muted-foreground hover:bg-muted"
                              onClick={() => setShowPassword((prev) => !prev)}
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                            </Button>
                          </div>
                        </FormControl>                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-end">
                  <Link
                    to={ROUTES.AUTH.FORGOT_PASSWORD}
                    className="text-sm font-medium text-primary transition-all hover:text-primary/80 hover:underline-offset-2 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full transition-all duration-150 active:scale-[0.98]"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 text-center text-sm"
          >
            Don't have an account?{' '}
            <Link to={ROUTES.AUTH.REGISTER} className="text-primary hover:text-primary/80 font-medium transition-all hover:underline-offset-2 hover:underline">
              Register
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
