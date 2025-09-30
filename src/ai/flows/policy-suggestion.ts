'use server';

/**
 * @fileOverview Policy Suggestion AI agent.
 *
 * - suggestPolicyUpdates - A function that suggests policy updates.
 * - PolicySuggestionInput - The input type for the suggestPolicyUpdates function.
 * - PolicySuggestionOutput - The return type for the suggestPolicyUpdates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PolicySuggestionInputSchema = z.object({
  currentPolicies: z
    .string()
    .describe('The current company policies related to leave and attendance.'),
  companyNeeds: z.string().describe('The specific needs and goals of the company.'),
  currentRegulations: z
    .string()
    .describe('The current employment regulations and laws.'),
});
export type PolicySuggestionInput = z.infer<typeof PolicySuggestionInputSchema>;

const PolicySuggestionOutputSchema = z.object({
  suggestedUpdates: z
    .string()
    .describe('Suggested updates to the company policies based on regulations and company needs.'),
  rationale: z
    .string()
    .describe('The rationale behind the suggested policy updates.'),
});
export type PolicySuggestionOutput = z.infer<typeof PolicySuggestionOutputSchema>;

export async function suggestPolicyUpdates(
  input: PolicySuggestionInput
): Promise<PolicySuggestionOutput> {
  return policySuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'policySuggestionPrompt',
  input: {schema: PolicySuggestionInputSchema},
  output: {schema: PolicySuggestionOutputSchema},
  prompt: `You are an HR policy expert. Your task is to suggest updates to company policies related to leave and attendance, ensuring compliance and fairness.

  Current Company Policies:
  {{currentPolicies}}

  Company Needs and Goals:
  {{companyNeeds}}

  Current Employment Regulations and Laws:
  {{currentRegulations}}

  Based on the above information, suggest updates to the company policies. Provide a clear rationale for each suggested update.

  Format your response as follows:

  Suggested Updates: [Suggested policy updates]
  Rationale: [Explanation for the updates]`,
});

const policySuggestionFlow = ai.defineFlow(
  {
    name: 'policySuggestionFlow',
    inputSchema: PolicySuggestionInputSchema,
    outputSchema: PolicySuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
