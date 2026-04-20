import { cn } from '@/shared/lib/utils';
import { Toaster } from '@/shared/ui/sonner';
import { ThemeProvider } from '@/shared/ui/theme-provider';
import { TooltipProvider } from '@/shared/ui/tooltip';
import { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import { ReactQueryProvider } from './_providers/react-query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Терминал MIFARE',
  description: 'Веб-приложение транспортного терминала для карт MIFARE',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cn(
        'antialiased',
        fontMono.variable,
        'font-sans',
        inter.variable
      )}
    >
      <body>
        <ReactQueryProvider>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
