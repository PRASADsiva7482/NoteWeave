'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {Icons} from '@/components/icons';
import {suggestNoteTitle} from '@/ai/flows/suggest-note-title';
import {transcribeVoiceNote} from '@/ai/flows/transcribe-voice-note';
import {Card} from '@/components/ui/card';

interface SidebarProps {
  onAddNote: (note: any) => void;
}

export function Sidebar({onAddNote}: SidebarProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const {toast} = useToast();
  const [audioUrl, setAudioUrl] = useState('');

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: 'Recording started!',
      description: 'Please speak into your microphone.',
    });
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    // Simulate audio URL, replace with actual recording logic later.
    const fakeAudioUrl = 'https://example.com/fake-audio.wav';
    setAudioUrl(fakeAudioUrl);

    try {
      const transcriptionResult = await transcribeVoiceNote({
        audioUrl: fakeAudioUrl,
      });
      setNoteContent(transcriptionResult.transcription);
      toast({
        title: 'Transcription complete!',
        description: 'Voice note has been converted to text.',
      });
    } catch (error) {
      console.error('Error transcribing voice note:', error);
      toast({
        variant: 'destructive',
        title: 'Transcription failed.',
        description: 'There was an error converting voice to text.',
      });
    }
  };

  const handleSuggestTitle = async () => {
    try {
      const titleSuggestions = await suggestNoteTitle({noteContent});
      setSuggestedTitles(titleSuggestions.suggestedTitles);
      toast({
        title: 'Title suggestions generated!',
        description: 'Choose a title or write your own.',
      });
    } catch (error) {
      console.error('Error suggesting title:', error);
      toast({
        variant: 'destructive',
        title: 'Title suggestion failed.',
        description: 'Failed to generate title suggestions.',
      });
    }
  };

  const handleAddNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Title and content cannot be empty.',
      });
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title: noteTitle,
      content: noteContent,
      date: new Date(),
    };

    onAddNote(newNote);
    setNoteTitle('');
    setNoteContent('');
    setSuggestedTitles([]);
    setAudioUrl('');

    toast({
      title: 'Success',
      description: 'Note saved!',
    });
  };

  const handleTitleSelect = (title: string) => {
    setNoteTitle(title);
  };

  return (
    <Card className="w-96 p-4 bg-secondary border-none rounded-none">
      <h2 className="text-lg font-semibold mb-4">Create Note</h2>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Note Title"
          value={noteTitle}
          onChange={e => setNoteTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <Textarea
          placeholder="Note Content"
          value={noteContent}
          onChange={e => setNoteContent(e.target.value)}
        />
      </div>

      {audioUrl && (
        <div className="mb-4">
          <p>Voice Note:</p>
          <audio src={audioUrl} controls />
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <Button
          variant="secondary"
          onClick={handleStartRecording}
          disabled={isRecording}
        >
          {isRecording ? 'Recording...' : <Icons.messageSquare />}
        </Button>
        <Button
          variant="secondary"
          onClick={handleStopRecording}
          disabled={!isRecording}
        >
          Stop Recording
        </Button>
      </div>

      <div className="flex flex-col mb-4">
        <Button variant="secondary" onClick={handleSuggestTitle}>
          Suggest Title
        </Button>
        {suggestedTitles.length > 0 && (
          <div className="mt-2">
            {suggestedTitles.map((title, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleTitleSelect(title)}
              >
                {title}
              </Button>
            ))}
          </div>
        )}
      </div>

      <Button onClick={handleAddNote} className="bg-primary text-primary-foreground">
        Add Note
      </Button>
    </Card>
  );
}
