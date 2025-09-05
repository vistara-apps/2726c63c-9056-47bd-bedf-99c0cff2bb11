'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'bottom' | 'center';
}

export function ActionSheet({ isOpen, onClose, title, children, variant = 'bottom' }: ActionSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const variants = {
    bottom: {
      initial: { y: '100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '100%', opacity: 0 }
    },
    center: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Action Sheet */}
          <motion.div
            initial={variants[variant].initial}
            animate={variants[variant].animate}
            exit={variants[variant].exit}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 ${
              variant === 'bottom'
                ? 'bottom-0 left-0 right-0 rounded-t-xl'
                : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl w-full max-w-md mx-4'
            }`}
          >
            <div className="glass-card p-6 max-h-[80vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div>{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
