import React, { useRef } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useUpdateAvatar } from '../hooks/useProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const AvatarUpload = () => {
  const { user } = useAuthStore();
  const { mutate: updateAvatar, isPending } = useUpdateAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      updateAvatar(formData, {
        onSuccess: () => {
          toast.success('Avatar updated successfully!');
        },
        onError: () => {
          toast.error('Failed to update avatar.');
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="text-4xl">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {isPending ? (
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          ) : (
            <Camera className="h-8 w-8 text-white" />
          )}
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-bold text-lg">{user?.name}</h3>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isPending}>
        Change Photo
      </Button>
    </div>
  );
};
