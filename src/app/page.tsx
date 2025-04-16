'use client';

import {NoteList} from '@/components/note-list';
import {Sidebar} from '@/components/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {useEffect, useState} from 'react';

export default function Home() {
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'Grocery List',
      content: 'Milk, Eggs, Bread, Cheese',
      date: new Date(),
    },
    {
      id: '2',
      title: 'Meeting Notes',
      content: 'Discuss project progress, assign tasks',
      date: new Date(),
    },
  ]);

  const addNote = (note: any) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onAddNote={addNote} />
      <NoteList notes={notes} onDeleteNote={deleteNote} />
      <Toaster />
    </div>
  );
}
