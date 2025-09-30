
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { users } from "@/lib/data";
import { EmployeeTable } from "@/components/app/employee-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useUser } from "@/lib/context/user-context";

export default function EmployeesPage() {
    const currentUser = useUser();

    if (!currentUser) {
        return (
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Loading...</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Loading user data...</p>
                    </CardContent>
                </Card>
            </main>
        );
    }

    if (currentUser.role !== 'admin') {
        return (
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You do not have permission to view this page.</p>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Manage Employees</CardTitle>
                        <CardDescription>A list of all employees in the system.</CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <a>
                            <PlusCircle className="h-4 w-4" />
                            Add Employee
                        </a>
                    </Button>
                </CardHeader>
                <CardContent>
                    <EmployeeTable users={users} />
                </CardContent>
            </Card>
        </main>
    );
}
