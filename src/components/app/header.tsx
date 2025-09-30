import {
    SidebarTrigger,
  } from "@/components/ui/sidebar"
import { UserNav } from "@/components/app/user-nav"
  
interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
      <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="w-full flex-1">
          <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        </div>
        <UserNav />
      </header>
    )
  }
  