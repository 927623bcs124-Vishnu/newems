
'use client'

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
import { Header } from '@/components/app/header';
import { MainNav } from '@/components/app/main-nav';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { users, type User as UserType } from '@/lib/data';
import { UserContext } from '@/lib/context/user-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      // In a real app, you would fetch user details from your database
      // For now, we'll find the user in our mock data or create a default one
      let appUser = users.find(u => u.email === user.email);
      if (!appUser) {
        // Create a default user object for new sign-ups
        appUser = {
          id: user.uid,
          name: user.displayName || 'New User',
          email: user.email!,
          role: 'employee',
          avatar: user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
          department: 'Unassigned',
          position: 'New Hire',
        };
      }
      setCurrentUser(appUser);
    }
  }, [user, loading, router]);

  if (loading || !currentUser) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <UserContext.Provider value={currentUser}>
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
    </UserContext.Provider>
  );
}
