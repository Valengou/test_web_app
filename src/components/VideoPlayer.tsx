import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  onFrameChange: (currentTime: number) => void;
}

export default function VideoPlayer({ videoUrl, onFrameChange }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipFrame = (forward: boolean) => {
    if (videoRef.current) {
      const frameTime = 1/30; // Assuming 30fps
      videoRef.current.currentTime += forward ? frameTime : -frameTime;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const timeUpdate = () => {
      setCurrentTime(video.currentTime);
      onFrameChange(video.currentTime);
    };

    video.addEventListener('timeupdate', timeUpdate);
    return () => video.removeEventListener('timeupdate', timeUpdate);
  }, [onFrameChange]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full rounded-lg shadow-lg"
        onClick={togglePlay}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => skipFrame(false)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <SkipBack className="w-5 h-5 text-white" />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isPlaying ? 
              <Pause className="w-6 h-6 text-white" /> : 
              <Play className="w-6 h-6 text-white" />
            }
          </button>
          
          <button
            onClick={() => skipFrame(true)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <SkipForward className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}