import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { attendanceRecords, currentUser } from "@/lib/data";
import { Clock } from "lucide-react";

export default function AttendancePage() {
    const userAttendance = attendanceRecords.filter(ar => ar.userId === currentUser.id);
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const todaysRecord = userAttendance.find(r => r.date === todayString);

    const handleClockIn = () => {
        // In a real app, this would call a server action to record the time.
        console.log('Clocking in...');
    }

    const handleClockOut = () => {
         // In a real app, this would call a server action to record the time.
        console.log('Clocking out...');
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-3 md:gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mark Attendance</CardTitle>
                            <CardDescription>Clock in and out for today.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
                                <div className="text-center">
                                    <p className="text-5xl font-bold">{today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p className="text-muted-foreground">{today.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            {todaysRecord && todaysRecord.clockIn ? (
                                <Button onClick={handleClockOut} className="w-full" disabled={!!todaysRecord.clockOut}>
                                    <Clock className="mr-2 h-4 w-4" />
                                    {todaysRecord.clockOut ? `Clocked Out at ${todaysRecord.clockOut}`: "Clock Out"}
                                </Button>
                            ) : (
                                <Button onClick={handleClockIn} className="w-full">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Clock In
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance History</CardTitle>
                            <CardDescription>A record of your past attendance.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Clock In</TableHead>
                                        <TableHead>Clock Out</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userAttendance.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell>{record.date}</TableCell>
                                            <TableCell>{record.status}</TableCell>
                                            <TableCell>{record.clockIn ?? 'N/A'}</TableCell>
                                            <TableCell>{record.clockOut ?? 'N/A'}</TableCell>
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
