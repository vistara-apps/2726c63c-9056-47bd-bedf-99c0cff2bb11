'use client';

import { LegalGuide } from '@/lib/types';
import { Clock, MapPin, BookOpen } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface LegalCardProps {
  guide: LegalGuide;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

export function LegalCard({ guide, variant = 'default', onClick }: LegalCardProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`glass-card p-4 cursor-pointer hover:bg-opacity-15 transition-all duration-200 ${
        isCompact ? 'space-y-2' : 'space-y-4'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'} text-blue-400`} />
            <span className={`${isCompact ? 'text-xs' : 'text-sm'} text-blue-300 font-medium`}>
              {guide.category.toUpperCase()}
            </span>
          </div>
          
          <h3 className={`${isCompact ? 'text-sm' : 'text-lg'} font-semibold text-white mb-2`}>
            {guide.title}
          </h3>
          
          {!isCompact && (
            <p className="text-sm text-gray-300 line-clamp-2 mb-3">
              {guide.content.substring(0, 120)}...
            </p>
          )}
          
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{guide.state}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(guide.lastUpdated)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>{guide.language.toUpperCase()}</span>
            </div>
          </div>
        </div>
        
        {!isCompact && (
          <div className="ml-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </div>
      
      {!isCompact && (
        <div className="flex items-center justify-between pt-3 border-t border-white border-opacity-10">
          <span className="text-xs text-gray-400">
            Updated {formatDate(guide.lastUpdated)}
          </span>
          <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">
            Read More →
          </button>
        </div>
      )}
    </div>
  );
}
