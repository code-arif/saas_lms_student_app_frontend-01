import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
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
import { cardVariants, formVariants, itemVariants } from '@/features/auth/constants/animations';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log('Forgot password request for:', data.email);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full max-w-md mx-auto shadow-xl shadow-black/5 dark:shadow-black/20">
        <CardHeader className="space-y-1.5 pb-4">
          <CardTitle className="text-xl font-semibold tracking-tight">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a link to reset your password
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
                  <Button type="submit" className="w-full transition-all duration-150 active:scale-[0.98]">
                    Send Reset Link
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
            <Link to={ROUTES.AUTH.LOGIN} className="text-primary hover:text-primary/80 font-medium transition-all hover:underline-offset-2 hover:underline">
              Back to Login
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ForgotPasswordPage;
