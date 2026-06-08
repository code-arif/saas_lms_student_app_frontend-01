import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { cn } from '@/utils/cn';

interface VideoPlayerProps {
  url: string;
  onProgress?: (second: number) => void;
  onEnded?: () => void;
  className?: string;
}

export const VideoPlayer = ({ url, onProgress, onEnded, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = url;
    } else if (Hls.isSupported()) {
      // Use hls.js
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  const handleTimeUpdate = () => {
    if (videoRef.current && onProgress) {
      onProgress(Math.floor(videoRef.current.currentTime));
    }
  };

  return (
    <div className={cn("relative aspect-video w-full bg-black rounded-lg overflow-hidden", className)}>
      <video
        ref={videoRef}
        className="h-full w-full"
        controls
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
      />
    </div>
  );
};
