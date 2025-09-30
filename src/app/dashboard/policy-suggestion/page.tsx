
'use client';

import { PolicySuggestionForm } from "@/components/app/policy-suggestion/policy-suggestion-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/lib/context/user-context";


export default function PolicySuggestionPage() {
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
            <PolicySuggestionForm />
        </main>
    );
}
