'use server';

import { suggestPolicyUpdates, type PolicySuggestionInput } from "@/ai/flows/policy-suggestion";
import { z } from "zod";

const policySchema = z.object({
    currentPolicies: z.string().min(10, { message: 'Current policies must be at least 10 characters long.' }),
    companyNeeds: z.string().min(10, { message: 'Company needs must be at least 10 characters long.' }),
    currentRegulations: z.string().min(10, { message: 'Current regulations must be at least 10 characters long.' }),
});

export async function getPolicySuggestion(prevState: any, formData: FormData) {
    const validatedFields = policySchema.safeParse({
        currentPolicies: formData.get('currentPolicies'),
        companyNeeds: formData.get('companyNeeds'),
        currentRegulations: formData.get('currentRegulations'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const result = await suggestPolicyUpdates(validatedFields.data as PolicySuggestionInput);
        return { message: 'success', data: result };
    } catch (error) {
        return { message: 'An error occurred while fetching policy suggestions.' };
    }
}
