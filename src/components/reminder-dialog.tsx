'use client';

import {useState} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Calendar} from '@/components/ui/calendar';
import {Button} from '@/components/ui/button';

interface ReminderDialogProps {
  noteId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReminderDialog({noteId, isOpen, onClose}: ReminderDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSetReminder = () => {
    if (selectedDate) {
      // TODO: Implement actual reminder setting logic.
      console.log(`Reminder set for note ${noteId} at ${selectedDate}`);
      onClose();
    }
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
          onSelect={setSelectedDate}
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
