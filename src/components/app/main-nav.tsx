'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, FileText, Users, Shield, Lightbulb, Clock, DollarSign } from "lucide-react";
import type { User as UserType } from "@/lib/types";

interface MainNavProps {
    currentUser: UserType;
}

export function MainNav({ currentUser }: MainNavProps) {
    const pathname = usePathname();

    const menuItems = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            roles: ['employee', 'manager', 'admin'],
        },
        {
            href: "/dashboard/profile",
            label: "Profile",
            icon: User,
            roles: ['employee', 'manager', 'admin'],
        },
        {
            href: "/dashboard/attendance",
            label: "Attendance",
            icon: Clock,
            roles: ['employee', 'manager', 'admin'],
        },
        {
            href: "/dashboard/leave",
            label: "Leave",
            icon: FileText,
            roles: ['employee', 'manager', 'admin'],
        },
        {
            href: "/dashboard/payroll",
            label: "Payroll",
            icon: DollarSign,
            roles: ['employee', 'manager', 'admin'],
        },
        {
            href: "/dashboard/team",
            label: "Team",
            icon: Users,
            roles: ['manager'],
        },
        {
            href: "/dashboard/policy-suggestion",
            label: "Policy AI",
            icon: Lightbulb,
            roles: ['admin'],
        },
    ];

    return (
        <SidebarMenu>
            {menuItems.map((item) =>
                item.roles.includes(currentUser.role) && (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href} passHref>
                            <SidebarMenuButton
                                className={cn(
                                    "w-full justify-start",
                                    pathname === item.href && "bg-sidebar-accent"
                                )}
                                asChild
                            >
                                <span>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                )
            )}
        </SidebarMenu>
    );
}
