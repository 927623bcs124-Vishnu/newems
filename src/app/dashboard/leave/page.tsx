
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { leaveRequests } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/context/user-context";

export default function LeavePage() {
    const currentUser = useUser();

    if (!currentUser) return <div>Loading...</div>;

    const userLeaves = leaveRequests.filter(lr => lr.userId === currentUser.id);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-3 md:gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Apply for Leave</CardTitle>
                            <CardDescription>Fill out the form to request time off.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="leaveType">Leave Type</Label>
                                    <Select>
                                        <SelectTrigger id="leaveType">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="annual">Annual</SelectItem>
                                            <SelectItem value="sick">Sick</SelectItem>
                                            <SelectItem value="unpaid">Unpaid</SelectItem>
                                            <SelectItem value="maternity">Maternity</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate">Start Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn("w-full justify-start text-left font-normal", !Date && "text-muted-foreground")}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    <span>Pick a date</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar mode="single" initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate">End Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn("w-full justify-start text-left font-normal", !Date && "text-muted-foreground")}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    <span>Pick a date</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar mode="single" initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reason">Reason</Label>
                                    <Textarea id="reason" placeholder="Please provide a reason for your leave." />
                                </div>
                                <Button type="submit" className="w-full">Submit Request</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Leave History</CardTitle>
                            <CardDescription>A record of your past leave requests.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userLeaves.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.leaveType}</TableCell>
                                            <TableCell>{request.startDate}</TableCell>
                                            <TableCell>{request.endDate}</TableCell>
                                            <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant={request.status === 'Approved' ? 'default' : request.status === 'Pending' ? 'secondary' : 'destructive'}>
                                                    {request.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
