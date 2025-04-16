# **App Name**: NoteWeave

## Core Features:

- Voice Recording: Allow users to record voice notes using the device's microphone.
- Voice-to-Text Conversion: Transcribe recorded voice notes into text using AI. Display transcription to the user.
- Note Listing: Display saved notes in a list format, showing the title/first line of the note, and the date of creation.
- Note Reminders: Allow users to set reminders for specific notes.  The reminders will only exist for the duration of the user's session.
- AI-Powered Title Suggestions: Use AI to suggest a title for a note based on its content. Present the suggestions to the user as options.  Let the user pick one or write their own.

## Style Guidelines:

- Primary color: A calming teal (#4DB6AC) to promote focus.
- Secondary color: Light gray (#EEEEEE) for backgrounds and neutral elements.
- Accent: A muted orange (#FFAB40) for highlights and call-to-action buttons.
- Use a clean, card-based layout for note display.
- Use simple, consistent icons for note actions (e.g., edit, delete, remind).
- Subtle transitions and animations for a polished user experience.

## Original User Request:
Build an Android app in Java named "UniNote" that allows users to:

1. Sign in using Firebase Authentication (email/password or Google sign-in).
2. Record voice notes using the microphone.
3. Convert voice notes to text using Android's SpeechRecognizer.
4. Save audio and text notes to Firebase (Firestore for text, Firebase Storage for audio).
5. Display all saved notes in a list with title, date, and short preview.
6. Set reminders for notes using DatePicker/TimePicker and trigger push notifications at the set time.
7. Use Firebase Cloud Messaging to handle scheduled reminders.
8. Clean UI using Material Design.
  