import { AuthProvider } from '@/app/_providers/auth-provider';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { AppHeader } from '@/widgets/app-header';
import { AppSidebar } from '@/widgets/app-sidebar';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className='@container/main flex flex-1 flex-col gap-10 p-6'>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
