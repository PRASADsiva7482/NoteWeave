'use server';

/**
 * @fileOverview Provides AI-powered title suggestions for notes.
 *
 * - suggestNoteTitle - The main function to suggest titles for a given note.
 * - SuggestNoteTitleInput - Input type for suggestNoteTitle, including the note content.
 * - SuggestNoteTitleOutput - Output type for suggestNoteTitle, a list of suggested titles.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

// Define the input schema for the suggestNoteTitle function
const SuggestNoteTitleInputSchema = z.object({
  noteContent: z.string().describe('The content of the note to generate titles for.'),
});
export type SuggestNoteTitleInput = z.infer<typeof SuggestNoteTitleInputSchema>;

// Define the output schema for the suggestNoteTitle function
const SuggestNoteTitleOutputSchema = z.object({
  suggestedTitles: z
    .array(z.string())
    .describe('An array of suggested titles for the note.'),
});
export type SuggestNoteTitleOutput = z.infer<typeof SuggestNoteTitleOutputSchema>;

// Exported function that calls the flow
export async function suggestNoteTitle(input: SuggestNoteTitleInput): Promise<SuggestNoteTitleOutput> {
  return suggestNoteTitleFlow(input);
}

// Define the prompt for suggesting note titles
const suggestNoteTitlePrompt = ai.definePrompt({
  name: 'suggestNoteTitlePrompt',
  input: {
    schema: z.object({
      noteContent: z.string().describe('The content of the note.'),
    }),
  },
  output: {
    schema: z.object({
      suggestedTitles: z
        .array(z.string())
        .describe('An array of suggested titles for the note.'),
    }),
  },
  prompt: `You are an AI assistant helping users create titles for their notes.

  Given the content of the note, suggest a few relevant titles that accurately reflect the note's main topic.
  Return the titles in an array.

  Note Content:
  {{noteContent}}`,
});

// Define the Genkit flow for suggesting note titles
const suggestNoteTitleFlow = ai.defineFlow<
  typeof SuggestNoteTitleInputSchema,
  typeof SuggestNoteTitleOutputSchema
>(
  {
    name: 'suggestNoteTitleFlow',
    inputSchema: SuggestNoteTitleInputSchema,
    outputSchema: SuggestNoteTitleOutputSchema,
  },
  async input => {
    const {output} = await suggestNoteTitlePrompt(input);
    return output!;
  }
);
