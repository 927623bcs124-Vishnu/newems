import { currentUser, leaveRequests, attendanceRecords, users } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, ArrowUpRight, Clock, CalendarOff, UserCheck, UserX } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function DashboardPage() {
    const todayAttendance = attendanceRecords.find(ar => ar.userId === currentUser.id && ar.date === new Date().toISOString().split('T')[0]);
  
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
    const userLeaves = leaveRequests.filter(lr => lr.userId === currentUser.id).slice(0, 5);
    const today = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">Status for today</p>
                    <div className="text-2xl font-bold text-primary">Present</div>
                    <Button className="mt-4 w-full">Clock Out at {today}</Button>
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
                            <CardTitle className="text-sm font-medium">Manage Employees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">Add, edit, or remove employee records.</p>
                        </CardContent>
                    </Card>
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

const Lightbulb = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 22q-.825 0-1.413-.588T10 20h4q0 .825-.588 1.413T12 22M9.15 18h5.7q-.25.65-.788 1.075T12 19.5q-.9 0-1.438-.425T9.15 18m.35-2.5q-1.125-.55-1.838-1.588T7 11.6q0-2.35 1.5-4.025T12 6.1q1.45 0 2.825.813T16.5 9.55q-.525-.3-1.1-.425t-1.2-.125q-1.925 0-3.363 1.338T9.5 13.6q0 .95.45 1.75t1.2 1.3l.65.4q-.225.25-.463.513T10.7 18.2q-.525-.425-.775-1.013T9.5 16.15q0-.325.075-.638T9.75 15M12 5q-.425 0-.713-.288T11 4q0-.425.288-.713T12 3q.425 0 .713.288T13 4q0 .425-.288.713T12 5m-4 2q-.425 0-.713-.288T7 6q0-.425.288-.713T8 5q.425 0 .713.288T9 6q0 .425-.288.713T8 7m8 0q-.425 0-.713-.288T15 6q0-.425.288-.713T16 5q.425 0 .713.288T17 6q0 .425-.288.713T16 7"/></svg>
)
