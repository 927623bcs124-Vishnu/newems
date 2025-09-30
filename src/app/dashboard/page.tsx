
'use client';

import { leaveRequests, attendanceRecords, users } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, ArrowUpRight, Clock, CalendarOff, UserCheck, UserX, Users, FileText, Lightbulb } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/context/user-context";

export default function DashboardPage() {
    const currentUser = useUser();
  
    if (!currentUser) return <div>Loading...</div>;

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Welcome back, {currentUser.name}!</h1>
            </div>

            {/* Role-based content */}
            {currentUser.role === 'employee' && <EmployeeDashboard />}
            {currentUser.role === 'manager' && <ManagerDashboard />}
            {currentUser.role === 'admin' && <AdminDashboard />}
        </main>
    )
}

const EmployeeDashboard = () => {
    const router = useRouter();
    const currentUser = useUser();
    if (!currentUser) return null;

    const userLeaves = leaveRequests.filter(lr => lr.userId === currentUser.id).slice(0, 5);
    const [currentTime, setCurrentTime] = useState('');
    const [todayString, setTodayString] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);

        const today = new Date();
        setTodayString(today.toISOString().split('T')[0]);

        return () => clearInterval(timer);
    }, []);

    const todaysRecord = attendanceRecords.find(ar => ar.userId === currentUser.id && ar.date === todayString);

    const handleClockInOut = () => {
        router.push('/dashboard/attendance');
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">Status for today</p>
                    <div className="text-2xl font-bold text-primary">{todaysRecord?.status ?? 'Absent'}</div>
                    <Button onClick={handleClockInOut} className="mt-4 w-full">
                        {todaysRecord && todaysRecord.clockIn ? 
                            (todaysRecord.clockOut ? `Clocked Out at ${todaysRecord.clockOut}`: `Clock Out`)
                            : "Clock In"}
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
                <CalendarOff className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12 <span className="text-sm font-normal text-muted-foreground">days</span></div>
                    <p className="text-xs text-muted-foreground">Annual leave remaining</p>
                    <Link href="/dashboard/leave" className="w-full">
                        <Button variant="outline" className="mt-4 w-full">Apply for Leave</Button>
                    </Link>
                </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle>Recent Leave Requests</CardTitle>
                    <CardDescription>Your last 5 leave applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <LeaveHistoryTable leaves={userLeaves} />
                </CardContent>
            </Card>
        </div>
    )
}

const ManagerDashboard = () => {
    const currentUser = useUser();
    if (!currentUser) return null;

    const pendingRequests = leaveRequests.filter(
        (lr) => currentUser.team?.includes(lr.userId) && lr.status === 'Pending'
    );
    const teamAttendance = attendanceRecords.filter(ar => currentUser.team?.includes(ar.userId));
    const presentCount = teamAttendance.filter(ar => ar.status === 'Present').length;
    
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Team Attendance</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{presentCount}/{currentUser.team?.length} Present</div>
                    <p className="text-xs text-muted-foreground">
                        {currentUser.team?.length! - presentCount} absent or on leave
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Leave Requests</CardTitle>
                    <UserX className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pendingRequests.length}</div>
                    <p className="text-xs text-muted-foreground">
                        requests need your approval
                    </p>
                </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-4">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Team Overview</CardTitle>
                        <CardDescription>Quick look at your team's status today.</CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="/dashboard/team">
                            Manage Team
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <TeamMembersTable />
                </CardContent>
            </Card>
        </div>
    );
}

const AdminDashboard = () => {
    return (
        <div className="grid gap-4">
             <Card>
                <CardHeader>
                    <CardTitle>Admin Dashboard</CardTitle>
                    <CardDescription>
                        Welcome to the admin control center. Here you can manage employees, policies, and payroll.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link href="/dashboard/employees">
                        <Card className="hover:bg-muted cursor-pointer transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Manage Employees</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">Add, edit, or remove employee records.</p>
                            </CardContent>
                        </Card>
                    </Link>
                     <Link href="/dashboard/policy-suggestion">
                        <Card className="hover:bg-muted cursor-pointer transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">AI Policy Suggestions</CardTitle>
                                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">Generate policy updates using AI.</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Card className="hover:bg-muted cursor-pointer transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Payroll Processing</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">Generate payslips and reports.</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}

const LeaveHistoryTable = ({ leaves }: { leaves: typeof leaveRequests }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {leaves.map((leave) => (
                <TableRow key={leave.id}>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{leave.startDate} to {leave.endDate}</TableCell>
                    <TableCell className="text-right">
                        <Badge variant={leave.status === 'Approved' ? 'default' : leave.status === 'Pending' ? 'secondary' : 'destructive'}>
                            {leave.status}
                        </Badge>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
)

const TeamMembersTable = () => {
    const currentUser = useUser();
    if (!currentUser) return null;
    
    const teamMembers = users.filter(user => currentUser.team?.includes(user.id));
    const teamMemberAttendance = attendanceRecords.filter(ar => currentUser.team?.includes(ar.userId));

    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Today's Status</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {teamMembers.map(member => {
                    const attendance = teamMemberAttendance.find(ar => ar.userId === member.id);
                    return (
                        <TableRow key={member.id}>
                            <TableCell className="font-medium flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {member.name}
                            </TableCell>
                            <TableCell>{member.position}</TableCell>
                            <TableCell>
                                <Badge variant={attendance?.status === 'Present' ? 'default' : attendance?.status === 'On Leave' ? 'secondary' : 'destructive'}>
                                {attendance?.status ?? 'Absent'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}
