
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { payslips } from "@/lib/data";
import { Download } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/lib/context/user-context";

export default function PayrollPage() {
    const currentUser = useUser();
    if (!currentUser) return <div>Loading...</div>;
    
    const userPayslips = payslips.filter(p => p.userId === currentUser.id);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>My Payslips</CardTitle>
                    <CardDescription>View and download your monthly payslips.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pay Period</TableHead>
                                <TableHead>Net Pay</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userPayslips.map((payslip) => (
                                <TableRow key={payslip.id}>
                                    <TableCell>{payslip.month} {payslip.year}</TableCell>
                                    <TableCell>${payslip.netPay.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={payslip.status === 'Paid' ? 'default' : 'secondary'}>
                                            {payslip.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={payslip.url} target="_blank" download>
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}
