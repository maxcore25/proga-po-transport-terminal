'use client';

import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '../lib/utils';

// https://gist.github.com/mjbalcueva/b21f39a8787e558d4c536bf68e267398

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('hide-password-toggle pr-10', className)}
        ref={ref}
        {...props}
      />
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
        onClick={() => setShowPassword(prev => !prev)}
      >
        {showPassword ? (
          <EyeIcon className='h-4 w-4' aria-hidden='true' />
        ) : (
          <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
        )}
        <span className='sr-only'>
          {showPassword ? 'Hide password' : 'Show password'}
        </span>
      </Button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
