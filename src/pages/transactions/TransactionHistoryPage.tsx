import React from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Receipt,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'payout';
  description: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  course?: string;
}

const transactions: Transaction[] = [
  {
    id: 'TXN-001',
    type: 'payment',
    description: 'Advanced React Patterns',
    amount: 49.99,
    currency: 'USD',
    date: '2026-06-15T10:30:00',
    status: 'completed',
    course: 'Advanced React Patterns',
  },
  {
    id: 'TXN-002',
    type: 'payment',
    description: 'Node.js Masterclass',
    amount: 79.99,
    currency: 'USD',
    date: '2026-06-12T14:00:00',
    status: 'completed',
    course: 'Node.js Masterclass',
  },
  {
    id: 'TXN-003',
    type: 'refund',
    description: 'Refund - Python for Beginners',
    amount: 39.99,
    currency: 'USD',
    date: '2026-06-10T09:15:00',
    status: 'completed',
    course: 'Python for Beginners',
  },
  {
    id: 'TXN-004',
    type: 'payment',
    description: 'UI/UX Design Fundamentals',
    amount: 59.99,
    currency: 'USD',
    date: '2026-06-08T16:45:00',
    status: 'pending',
    course: 'UI/UX Design Fundamentals',
  },
  {
    id: 'TXN-005',
    type: 'payout',
    description: 'Instructor payout - Monthly',
    amount: 320.00,
    currency: 'USD',
    date: '2026-06-01T08:00:00',
    status: 'completed',
  },
  {
    id: 'TXN-006',
    type: 'payment',
    description: 'TypeScript Deep Dive',
    amount: 44.99,
    currency: 'USD',
    date: '2026-05-28T11:20:00',
    status: 'failed',
    course: 'TypeScript Deep Dive',
  },
  {
    id: 'TXN-007',
    type: 'payment',
    description: 'AWS Cloud Practitioner Prep',
    amount: 69.99,
    currency: 'USD',
    date: '2026-05-25T13:10:00',
    status: 'completed',
    course: 'AWS Cloud Practitioner Prep',
  },
  {
    id: 'TXN-008',
    type: 'refund',
    description: 'Refund - Docker & Kubernetes',
    amount: 54.99,
    currency: 'USD',
    date: '2026-05-20T15:30:00',
    status: 'completed',
    course: 'Docker & Kubernetes',
  },
];

const typeConfig = {
  payment: {
    icon: ArrowUpRight,
    label: 'Payment',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    badge: 'default',
  },
  refund: {
    icon: RefreshCw,
    label: 'Refund',
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    badge: 'secondary',
  },
  payout: {
    icon: ArrowDownRight,
    label: 'Payout',
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    badge: 'outline',
  },
};

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

const TransactionHistoryPage = () => {
  const totalSpent = transactions
    .filter((t) => t.type === 'payment' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = transactions
    .filter((t) => t.type === 'refund')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Transaction History"
        subtitle="View all your payments, refunds, and payouts."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="ring-0">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
              <ArrowUpRight className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">{formatAmount(totalSpent, 'USD')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="ring-0">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30">
              <RefreshCw className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Refunds</p>
              <p className="text-2xl font-bold">{formatAmount(totalRefunds, 'USD')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="ring-0">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30">
              <Receipt className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <p className="text-2xl font-bold">{transactions.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <CreditCard className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.map((txn, index) => {
          const config = typeConfig[txn.type];
          const Icon = config.icon;

          return (
            <Card key={txn.id} className="ring-0 transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-4 py-4">
                {/* Type Icon */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{txn.description}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {txn.id} &middot; {formatDate(txn.date)}
                      </p>
                      {txn.course && (
                        <p className="mt-1 text-xs text-muted-foreground/70">
                          Course: {txn.course}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-semibold ${txn.type === 'refund' ? 'text-amber-600' : txn.type === 'payout' ? 'text-blue-600' : ''}`}>
                        {txn.type === 'refund' ? '+' : txn.type === 'payout' ? '+' : '-'}
                        {formatAmount(txn.amount, txn.currency)}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`mt-1 px-2 py-0.5 text-[10px] font-medium uppercase ${statusStyles[txn.status]}`}
                      >
                        {txn.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state for future when no transactions */}
      {transactions.length === 0 && (
        <Card className="ring-0">
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Receipt className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <div>
              <p className="text-lg font-medium">No transactions yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your payment history will appear here once you make a purchase.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TransactionHistoryPage;
