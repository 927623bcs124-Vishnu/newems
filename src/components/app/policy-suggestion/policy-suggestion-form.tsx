"use client"

import { useFormState, useFormStatus } from "react-dom";
import { getPolicySuggestion } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

const initialState = {
  message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Generating...' : 'Generate Suggestions'}
      </Button>
    );
}

export function PolicySuggestionForm() {
    const [state, formAction] = useFormState(getPolicySuggestion, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state?.message && state.message !== 'success') {
          toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
          });
        }
      }, [state, toast]);

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Policy Details</CardTitle>
                    <CardDescription>Provide the necessary information for the AI to generate suggestions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPolicies">Current Policies</Label>
                            <Textarea id="currentPolicies" name="currentPolicies" placeholder="Describe your current leave and attendance policies..." rows={5} />
                            {state?.errors?.currentPolicies && <p className="text-sm font-medium text-destructive">{state.errors.currentPolicies}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="companyNeeds">Company Needs</Label>
                            <Textarea id="companyNeeds" name="companyNeeds" placeholder="What are the company's goals? (e.g., improve productivity, reduce absenteeism)" rows={5} />
                            {state?.errors?.companyNeeds && <p className="text-sm font-medium text-destructive">{state.errors.companyNeeds}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentRegulations">Current Regulations</Label>
                            <Textarea id="currentRegulations" name="currentRegulations" placeholder="List any relevant local or national employment laws." rows={5} />
                            {state?.errors?.currentRegulations && <p className="text-sm font-medium text-destructive">{state.errors.currentRegulations}</p>}
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>AI-Powered Suggestions</CardTitle>
                        <CardDescription>Based on your input, here are the suggested policy updates.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {state?.message === 'success' && state.data ? (
                             <div className="space-y-4">
                                 <Alert>
                                    <Lightbulb className="h-4 w-4" />
                                    <AlertTitle>Suggested Updates</AlertTitle>
                                    <AlertDescription className="whitespace-pre-wrap">{state.data.suggestedUpdates}</AlertDescription>
                                </Alert>
                                <Alert>
                                    <Lightbulb className="h-4 w-4" />
                                    <AlertTitle>Rationale</AlertTitle>
                                    <AlertDescription className="whitespace-pre-wrap">{state.data.rationale}</AlertDescription>
                                </Alert>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
                                <p className="text-muted-foreground">Suggestions will appear here.</p>
                            </div>
                        )}
                       
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
