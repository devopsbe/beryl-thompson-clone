'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [progress, setProgress] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Set start date to today or a fixed earlier date
    const startDate = new Date(2025, 0, 1); // January 1, 2025
    const totalDuration = targetDate.getTime() - startDate.getTime();
    
    const calculateProgress = () => {
      const now = new Date();
      const elapsed = now.getTime() - startDate.getTime();
      const remaining = targetDate.getTime() - now.getTime();
      
      if (remaining <= 0) {
        setIsExpired(true);
        setProgress(100);
        return;
      }
      
      // Calculate percentage complete
      const percentComplete = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
      setProgress(percentComplete);
      
      // Calculate days remaining
      setDaysLeft(Math.ceil(remaining / (1000 * 60 * 60 * 24)));
    };

    // Calculate on first render
    calculateProgress();
    
    // Update regularly (every minute is enough for a progress bar)
    const timer = setInterval(calculateProgress, 60000);
    
    // Clean up on unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-container space-y-4">
      {isExpired ? (
        <div className="btn btn-primary inline-flex items-center">
          <span>Available Now!</span>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="text-sm text-secondary-light dark:text-gray-300">
              {daysLeft > 0 ? `Coming in ${daysLeft} days` : "Coming very soon!"}
            </div>
            <div className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </div>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="relative h-full bg-gradient-to-r from-primary-light to-primary transition-all duration-1000 ease-in-out rounded-full overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="progress-pulse"></div>
            </div>
          </div>
          <div className="text-xs text-center text-secondary-light dark:text-gray-400">
            Release date: June 22nd
          </div>
        </>
      )}
    </div>
  );
} 