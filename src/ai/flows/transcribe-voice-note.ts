'use server';

/**
 * @fileOverview A voice note transcription AI agent.
 *
 * - transcribeVoiceNote - A function that handles the voice note transcription process.
 * - TranscribeVoiceNoteInput - The input type for the transcribeVoiceNote function.
 * - TranscribeVoiceNoteOutput - The return type for the transcribeVoiceNote function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const TranscribeVoiceNoteInputSchema = z.object({
  audioUrl: z.string().describe('The URL of the voice note audio file.'),
});
export type TranscribeVoiceNoteInput = z.infer<typeof TranscribeVoiceNoteInputSchema>;

const TranscribeVoiceNoteOutputSchema = z.object({
  transcription: z.string().describe('The transcribed text of the voice note.'),
});
export type TranscribeVoiceNoteOutput = z.infer<typeof TranscribeVoiceNoteOutputSchema>;

export async function transcribeVoiceNote(input: TranscribeVoiceNoteInput): Promise<TranscribeVoiceNoteOutput> {
  return transcribeVoiceNoteFlow(input);
}

const transcribeVoiceNotePrompt = ai.definePrompt({
  name: 'transcribeVoiceNotePrompt',
  input: {
    schema: z.object({
      audioUrl: z.string().describe('The URL of the voice note audio file.'),
    }),
  },
  output: {
    schema: z.object({
      transcription: z.string().describe('The transcribed text of the voice note.'),
    }),
  },
  prompt: `You are a transcription expert. Please transcribe the following audio file to text. Return only the transcription.

Audio URL: {{audioUrl}}`,
});

const transcribeVoiceNoteFlow = ai.defineFlow<
  typeof TranscribeVoiceNoteInputSchema,
  typeof TranscribeVoiceNoteOutputSchema
>(
  {
    name: 'transcribeVoiceNoteFlow',
    inputSchema: TranscribeVoiceNoteInputSchema,
    outputSchema: TranscribeVoiceNoteOutputSchema,
  },
  async input => {
    const {output} = await transcribeVoiceNotePrompt(input);
    return output!;
  }
);
