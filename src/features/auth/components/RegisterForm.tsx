import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { RegisterCredentials } from '../types/auth.types';
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

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  password_confirmation: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register, isRegistering } = useAuth();
  const [showPasswords, setShowPasswords] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const passwordType = showPasswords ? 'text' : 'password';
  const toggleShowPasswords = () => setShowPasswords((prev) => !prev);

  const onSubmit = (data: RegisterFormValues) => {
    const { name, email, password } = data;
    register({ name, email, password });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full max-w-md mx-auto shadow-xl shadow-black/5 dark:shadow-black/20">
        <CardHeader className="space-y-1.5 pb-4">
          <CardTitle className="text-xl font-semibold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create your student account
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
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
                              type={passwordType}
                              placeholder="••••••••"
                              className="pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute inset-y-0 right-1.5 z-10 rounded-md border-none bg-transparent text-muted-foreground hover:bg-muted"
                              onClick={toggleShowPasswords}
                              aria-label={showPasswords ? 'Hide password' : 'Show password'}
                            >
                              {showPasswords ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={passwordType}
                              placeholder="••••••••"
                              className="pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute inset-y-0 right-1.5 z-10 rounded-md border-none bg-transparent text-muted-foreground hover:bg-muted"
                              onClick={toggleShowPasswords}
                              aria-label={showPasswords ? 'Hide password' : 'Show password'}
                            >
                              {showPasswords ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full transition-all duration-150 active:scale-[0.98]"
                    disabled={isRegistering}
                  >
                    {isRegistering ? 'Creating account...' : 'Register'}
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
            Already have an account?{' '}
            <Link to={ROUTES.AUTH.LOGIN} className="text-primary hover:text-primary/80 font-medium transition-all hover:underline-offset-2 hover:underline">
              Login
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
