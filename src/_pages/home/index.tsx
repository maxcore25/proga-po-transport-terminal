'use client';

import { TerminalSimulator } from '@/features/terminal-simulator';
import { Button } from '@/shared/ui/button';
import { ModeToggle } from '@/shared/ui/mode-toggle';
import Link from 'next/link';

export const HomePage = () => {
  return (
    <>
      <header className='flex items-center justify-between px-2 py-4 md:px-4'>
        <div />
        <div className='flex items-center gap-3'>
          <ModeToggle />
          <Button asChild variant='outline'>
            <Link href='/admin'>Админка</Link>
          </Button>
        </div>
      </header>
      <TerminalSimulator />
    </>
  );
};
