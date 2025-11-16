'use server';

/**
 * @fileOverview Flow to generate a tournament bracket and match schedule based on the selected format and registered participants.
 *
 * - generateTournamentBracket - A function that generates the tournament bracket.
 * - GenerateTournamentBracketInput - The input type for the generateTournamentBracket function.
 * - GenerateTournamentBracketOutput - The return type for the generateTournamentBracket function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTournamentBracketInputSchema = z.object({
  tournamentFormat: z
    .string()
    .describe(
      'The format of the tournament (e.g., single elimination, double elimination, round robin).'
    ),
  registeredParticipants: z
    .string()
    .describe(
      'A list of the registered participants (players/teams) in the tournament.'
    ),
  constraints: z
    .string()
    .optional()
    .describe(
      'Any constraints or special criteria for generating the match pairings.'
    ),
});
export type GenerateTournamentBracketInput = z.infer<
  typeof GenerateTournamentBracketInputSchema
>;

const GenerateTournamentBracketOutputSchema = z.object({
  bracket: z.string().describe('The generated tournament bracket.'),
  matchSchedule: z.string().describe('The generated match schedule.'),
});
export type GenerateTournamentBracketOutput = z.infer<
  typeof GenerateTournamentBracketOutputSchema
>;

export async function generateTournamentBracket(
  input: GenerateTournamentBracketInput
): Promise<GenerateTournamentBracketOutput> {
  return generateTournamentBracketFlow(input);
}

const generateTournamentBracketPrompt = ai.definePrompt({
  name: 'generateTournamentBracketPrompt',
  input: {schema: GenerateTournamentBracketInputSchema},
  output: {schema: GenerateTournamentBracketOutputSchema},
  prompt: `You are a tournament organizer. Generate a tournament bracket and match schedule based on the following information:

Tournament Format: {{{tournamentFormat}}}
Registered Participants: {{{registeredParticipants}}}
Constraints: {{{constraints}}}

Bracket:`, // Removed Handlebars 'else' clause and simplified prompt
});

const generateTournamentBracketFlow = ai.defineFlow(
  {
    name: 'generateTournamentBracketFlow',
    inputSchema: GenerateTournamentBracketInputSchema,
    outputSchema: GenerateTournamentBracketOutputSchema,
  },
  async input => {
    const {output} = await generateTournamentBracketPrompt(input);
    return output!;
  }
);
