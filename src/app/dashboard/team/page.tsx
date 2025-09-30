
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { leaveRequests, attendanceRecords, users } from "@/lib/data";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/lib/context/user-context";

export default function TeamPage() {
    const currentUser = useUser();
    
    if (!currentUser) return <div>Loading...</div>;

    if (currentUser.role !== 'manager') {
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
    const teamLeaveRequests = leaveRequests.filter(lr => currentUser.team?.includes(lr.userId));
    const teamAttendance = users
        .filter(user => currentUser.team?.includes(user.id))
        .map(user => {
            const attendance = attendanceRecords.find(ar => ar.userId === user.id);
            return {
                ...user,
                status: attendance?.status ?? 'Absent',
                clockIn: attendance?.clockIn,
            };
        });

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Tabs defaultValue="leave-requests">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="leave-requests">Leave Requests</TabsTrigger>
                        <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="leave-requests">
                    <Card>
                        <CardHeader>
                            <CardTitle>Leave Requests</CardTitle>
                            <CardDescription>Approve or reject leave requests from your team.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Dates</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teamLeaveRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.userName}</TableCell>
                                            <TableCell>{request.leaveType}</TableCell>
                                            <TableCell>{request.startDate} - {request.endDate}</TableCell>
                                            <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                                            <TableCell>
                                                <Badge variant={request.status === 'Approved' ? 'default' : request.status === 'Pending' ? 'secondary' : 'destructive'}>
                                                    {request.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {request.status === 'Pending' && (
                                                    <div className="flex gap-2 justify-end">
                                                        <Button size="icon" variant="outline" className="h-8 w-8 text-green-500 hover:text-green-600 border-green-500 hover:border-green-600">
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="icon" variant="outline" className="h-8 w-8 text-red-500 hover:text-red-600 border-red-500 hover:border-red-600">
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="attendance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Attendance</CardTitle>
                            <CardDescription>Monitor your team's daily attendance.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Clock In</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teamAttendance.map((member) => (
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
                                                <Badge variant={member.status === 'Present' ? 'default' : member.status === 'On Leave' ? 'secondary' : 'destructive'}>
                                                    {member.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{member.clockIn ?? 'N/A'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
}
