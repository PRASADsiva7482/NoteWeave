'use client';

import {useState} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {Calendar} from '@/components/ui/calendar';
import {Button} from '@/components/ui/button';
import {setReminder} from '@/services/reminder';

interface ReminderDialogProps {
  noteId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReminderDialog({noteId, isOpen, onClose}: ReminderDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleSetReminder = async () => {
    if (selectedDate) {
      try {
        await setReminder({
          noteId: noteId,
          dateTime: selectedDate,
        });
        console.log(`Reminder set for note ${noteId} at ${selectedDate}`);
        onClose();
      } catch (error) {
        console.error('Failed to set reminder:', error);
        // TODO: Implement error handling (e.g., display an error message to the user)
      }
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date ? new Date(date) : undefined);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Set Reminder</AlertDialogTitle>
        <AlertDialogDescription>
          Choose a date and time to be reminded about note {noteId}.
        </AlertDialogDescription>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
        />
        <div className="flex justify-end mt-4">
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSetReminder}>
            Set Reminder
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
