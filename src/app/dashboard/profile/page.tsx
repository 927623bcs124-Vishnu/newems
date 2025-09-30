
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/context/user-context";

export default function ProfilePage() {
    const currentUser = useUser();

    if (!currentUser) return <div>Loading...</div>;
    
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>My Profile</CardTitle>
                        <CardDescription>View and edit your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline">Change Photo</Button>
                        </div>

                        <form className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue={currentUser.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue={currentUser.email} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Input id="department" defaultValue={currentUser.department} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input id="position" defaultValue={currentUser.position} />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <Button>Save Changes</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
