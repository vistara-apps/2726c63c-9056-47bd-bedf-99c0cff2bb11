'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, Square } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface RecordButtonProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  variant?: 'prominent' | 'discreet';
  recordingType?: 'audio' | 'video';
}

export function RecordButton({ 
  isRecording, 
  onStartRecording, 
  onStopRecording, 
  variant = 'prominent',
  recordingType = 'audio'
}: RecordButtonProps) {
  const [recordingDuration, setRecordingDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleClick = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  const isProminent = variant === 'prominent';
  const Icon = recordingType === 'video' 
    ? (isRecording ? VideoOff : Video)
    : (isRecording ? MicOff : Mic);

  if (variant === 'discreet') {
    return (
      <button
        onClick={handleClick}
        className={`p-2 rounded-full transition-all duration-200 ${
          isRecording
            ? 'bg-red-500 text-white animate-pulse'
            : 'glass-surface text-gray-300 hover:text-white'
        }`}
      >
        <Icon className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Recording Duration */}
      {isRecording && (
        <div className="glass-surface px-3 py-1 rounded-full">
          <span className="text-sm font-mono text-white">
            {formatDuration(recordingDuration)}
          </span>
        </div>
      )}

      {/* Main Record Button */}
      <button
        onClick={handleClick}
        className={`relative p-6 rounded-full transition-all duration-200 shadow-lg ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
        }`}
      >
        {isRecording ? (
          <Square className="h-8 w-8 text-white" />
        ) : (
          <Icon className="h-8 w-8 text-white" />
        )}
        
        {/* Recording indicator ring */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
        )}
      </button>

      {/* Button Label */}
      <span className="text-sm text-gray-300 font-medium">
        {isRecording ? 'Stop Recording' : `Start ${recordingType === 'video' ? 'Video' : 'Audio'}`}
      </span>
    </div>
  );
}
