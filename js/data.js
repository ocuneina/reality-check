// ── HOOK DATA ──────────────────────────────────────
const hookMusic = './audio/background.mp3';
// Music by: Bensound
// License code: YWXZLJCRL22CQOCW
// Artist: : Benjamin Tissot

const shuffleData = [
  { src: 'images/hook1.png', desc: 'Description pic 1' },
  {
    src: 'images/hook2.png',
    desc: '2 What is happening around the world at this moment?',
  },
  { src: 'images/hook3.png', desc: '3 Dinosaur in Times Square' },
  {
    src: 'images/hook4.png',
    desc: '4 Cleopatra enjoying a ride on her motorcycle',
  },
  {
    src: 'images/hook5.png',
    desc: "5 Why do these images feel believable even though we know it's impossible?",
  },
];
// ── COURSE UNITS ──────────────────────────────────────
const courseUnits = [
  {
    id: 'unit0',
    label: 'Unit 0',
    duration: '1 hr',
    name: 'Assessment & Launch',
    desc: 'Course expectations and baseline skills.',
    locked: true,
  },
  {
    id: 'unit1',
    label: 'Unit 1',
    duration: '3 hrs',
    name: 'Foundations',
    desc: 'What AI-generated media is.',
    locked: false,
  },
  {
    id: 'unit2',
    label: 'Unit 2',
    duration: '5 hrs',
    name: 'AI Images',
    desc: 'Spot common AI "tells".',
    locked: false,
  },
  {
    id: 'unit3',
    label: 'Unit 3',
    duration: '5 hrs',
    name: 'Real but Looks Fake',
    desc: 'Filters and camera effects.',
    locked: false,
  },
  {
    id: 'unit4',
    label: 'Unit 4',
    duration: '5 hrs',
    name: 'Edited / Photoshopped',
    desc: 'Manipulation artifacts.',
    locked: false,
  },
  {
    id: 'unit5',
    label: 'Unit 5',
    duration: '5 hrs',
    name: 'AI Video & Deepfakes',
    desc: 'Detect video/audio cues.',
    locked: false,
  },
  {
    id: 'unit6',
    label: 'Unit 6',
    duration: '3 hrs',
    name: 'Verification & Ethics',
    desc: 'Workflow for checking sources.',
    locked: false,
  },
  {
    id: 'unit7',
    label: 'Unit 7',
    duration: '3 hrs',
    name: 'Review and Exam',
    desc: 'Final comprehensive review.',
    locked: true,
  },
];
const HOURS_PER_DAY = 2;
// ── HOLIDAYS ──────────────────────────────────
const holidays = [
  '2024-12-25',
  '2024-12-26',
  '2025-01-01',
  '2025-04-18',
  '2025-05-26',
  '2025-12-25',
  '2026-01-01',
  '2026-04-03',
  '2026-05-25',
  '2026-12-25',
];
// ── INSTRUCTOR SLOTS ──────────────────────────────────
const instructorSlots = {
  'Tanya Gabie': {
    date1: ['09:00 AM', '09:15 AM', '10:30 AM', '10:45 AM', '02:00 PM'],
    date2: ['01:15 PM', '01:30 PM', '03:00 PM', '03:15 PM'],
  },
  'Yifan Liu': {
    date1: ['11:00 AM', '11:15 AM', '01:00 PM', '01:15 PM', '04:30 PM'],
    date2: ['09:30 AM', '09:45 AM', '10:00 AM', '02:45 PM'],
  },
};
// ── PACE OPTIONS ──────────────────────────────────────
const paceOptions = [
  { value: 1.0, label: '100% — Standard (Recommended)' },
  { value: 0.9, label: '90% — Slightly Faster' },
  { value: 0.8, label: '80% — Fast' },
  { value: 0.7, label: '70% — Very Fast' },
  { value: 0.6, label: '60% — Accelerated' },
];
const levelCards = [
  {
    level: 'novice',
    num: 1,
    title: 'Novice Level',
    videoId: 'AC-s4VoJ6A4',
    videoUrl: 'https://youtu.be/AC-s4VoJ6A4',
    checklist: 'Level 1 Checklist',
    image: 'images/novice.png',
  },
  {
    level: 'intermediate',
    num: 2,
    title: 'Intermediate Level',
    videoId: 'SmCfBhIPC-Y',
    videoUrl: 'https://youtu.be/SmCfBhIPC-Y',
    checklist: 'Level 2 Checklist',
    image: 'images/intermediate.png',
  },
  {
    level: 'advanced',
    num: 3,
    title: 'Advanced Level',
    videoId: 'Rb0f4jlVLC4',
    videoUrl: 'https://youtu.be/Rb0f4jlVLC4',
    checklist: 'Level 3 Checklist',
    image: 'images/advanced.png',
  },
];
