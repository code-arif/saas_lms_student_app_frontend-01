import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  BellRing,
  Mail,
  MessageSquare,
  BookOpen,
  Award,
  Megaphone,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useUpdateNotificationPreferences } from '../hooks/useProfile';

const notificationSchema = z.object({
  email_notifications: z.boolean(),
  email_course_updates: z.boolean(),
  email_assignments: z.boolean(),
  email_quiz_results: z.boolean(),
  push_notifications: z.boolean(),
  push_messages: z.boolean(),
  push_achievements: z.boolean(),
  push_announcements: z.boolean(),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

export const NotificationSettings = () => {
  const { mutate: updatePreferences, isPending } = useUpdateNotificationPreferences();

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      email_notifications: true,
      email_course_updates: true,
      email_assignments: true,
      email_quiz_results: false,
      push_notifications: true,
      push_messages: true,
      push_achievements: true,
      push_announcements: false,
    },
  });

  const watchedEmailToggle = form.watch('email_notifications');
  const watchedPushToggle = form.watch('push_notifications');

  const onSubmit = (data: NotificationFormValues) => {
    updatePreferences(data, {
      onSuccess: () => {
        toast.success('Notification preferences updated!');
      },
      onError: () => {
        toast.error('Failed to update notification preferences.');
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-primary" />
          <CardTitle>Notification Preferences</CardTitle>
        </div>
        <CardDescription>
          Choose how and when you want to receive notifications from the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Notifications Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Email Notifications</h4>
                  <p className="text-xs text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <div className="ml-auto">
                  <FormField
                    control={form.control}
                    name="email_notifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className={`space-y-3 ml-11 ${!watchedEmailToggle ? 'opacity-40 pointer-events-none' : ''}`}>
                <FormField
                  control={form.control}
                  name="email_course_updates"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-start gap-3">
                        <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <FormLabel className="text-sm font-medium">Course Updates</FormLabel>
                          <FormDescription className="text-xs">
                            New lessons, materials, and course announcements
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email_assignments"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <FormLabel className="text-sm font-medium">Assignments</FormLabel>
                          <FormDescription className="text-xs">
                            New assignments, due dates, and grade updates
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email_quiz_results"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-start gap-3">
                        <Award className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <FormLabel className="text-sm font-medium">Quiz Results</FormLabel>
                          <FormDescription className="text-xs">
                            Scores and feedback from completed quizzes
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Push Notifications Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Push Notifications</h4>
                  <p className="text-xs text-muted-foreground">
                    Receive in-app notifications
                  </p>
                </div>
                <div className="ml-auto">
                  <FormField
                    control={form.control}
                    name="push_notifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className={`space-y-3 ml-11 ${!watchedPushToggle ? 'opacity-40 pointer-events-none' : ''}`}>
                <FormField
                  control={form.control}
                  name="push_messages"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <FormLabel className="text-sm font-medium">Messages</FormLabel>
                          <FormDescription className="text-xs">
                            Direct messages from instructors and peers
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="push_achievements"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-start gap-3">
                        <Award className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <FormLabel className="text-sm font-medium">Achievements</FormLabel>
                          <FormDescription className="text-xs">
                            Certificates, badges, and milestones earned
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="push_announcements"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-start gap-3">
                        <Megaphone className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <FormLabel className="text-sm font-medium">Announcements</FormLabel>
                          <FormDescription className="text-xs">
                            Platform-wide announcements and updates
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Preferences'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isPending}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
