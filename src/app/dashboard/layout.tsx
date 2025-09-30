import type { Metadata } from 'next';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/data';
import { Header } from '@/components/app/header';
import { MainNav } from '@/components/app/main-nav';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard - EmployEase',
  description: 'Your employee management dashboard.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // We can get the current path to set the header title
  // For now, it is hardcoded.
  // In a real app, you might use a hook or context to manage this.
  const getTitle = () => {
    // A real implementation would parse the pathname
    return "Dashboard";
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-primary-foreground"><path fill="currentColor" d="M12.75 2.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0v-8.5Z M16.5 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z M4.25 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z M12 12.75a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1 0-1.5h8.5a.75.75 0 0 1 .75.75Zm.75 4.5a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0v-4Z M16.5 14a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Zm-9.5 6.5a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"/></svg>
                <Link href="/dashboard">
                    <h2 className="text-xl font-bold tracking-tight text-primary-foreground">EmployEase</h2>
                </Link>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <MainNav currentUser={currentUser} />
        </SidebarContent>
        <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
                <Badge variant="destructive" className="ml-auto">3</Badge>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
