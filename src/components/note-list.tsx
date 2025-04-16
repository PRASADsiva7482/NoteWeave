'use client';

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';
import {cn} from '@/lib/utils';
import {useState} from 'react';
import {ReminderDialog} from './reminder-dialog';

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
}

interface NoteListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

export function NoteList({notes, onDeleteNote}: NoteListProps) {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);

  const handleSetReminder = (noteId: string) => {
    setSelectedNoteId(noteId);
    setIsReminderDialogOpen(true);
  };

  const handleReminderDialogClose = () => {
    setIsReminderDialogOpen(false);
    setSelectedNoteId(null);
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="w-full p-4 flex justify-center">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map(note => (
          <Card key={note.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content.substring(0, 100)}...</p>
              <p className="text-sm text-muted-foreground mt-2">
                {formatDate(note.date)}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetReminder(note.id)}
              >
                <Icons.edit className="w-4 h-4 mr-2" />
                Remind
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteNote(note.id)}
              >
                <Icons.trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
        {isReminderDialogOpen && selectedNoteId && (
          <ReminderDialog
            noteId={selectedNoteId}
            isOpen={isReminderDialogOpen}
            onClose={handleReminderDialogClose}
          />
        )}
      </div>
    </div>
  );
}
