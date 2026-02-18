import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

export interface TouchButtonProps extends ButtonProps {
  touchOptimized?: boolean;
}

const TouchButton = React.forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ className, touchOptimized = true, size = 'md', ...props }, ref) => {
    const touchStyles = touchOptimized 
      ? 'min-h-[44px] min-w-[44px] touch-manipulation' // Apple's recommended minimum touch target size
      : '';

    const enhancedSize = touchOptimized && size === 'sm' ? 'md' : size;

    return (
      <Button
        className={cn(touchStyles, className)}
        size={enhancedSize}
        ref={ref}
        {...props}
      />
    );
  }
);

TouchButton.displayName = 'TouchButton';

export { TouchButton };