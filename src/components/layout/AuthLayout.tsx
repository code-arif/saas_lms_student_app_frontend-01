import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const brandVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const outletVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const AuthLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30 py-12 sm:px-6 lg:px-8">
      {/* Subtle decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        className="relative sm:mx-auto sm:w-full sm:max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={brandVariants} className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 ring-1 ring-primary/10">
            <BookOpen className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            SaaS LMS
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Student Learning Platform
          </p>
        </motion.div>

        <motion.div variants={outletVariants}>
          <Outlet />
        </motion.div>
      </motion.div>
    </div>
  );
};
