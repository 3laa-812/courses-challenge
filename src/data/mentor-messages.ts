import type { Course } from "@/types/course";

export type LevelRange = {
  min: number;
  max: number;
  label: string;
  messages: string[];
};

export const levelRanges: LevelRange[] = [
  {
    min: 0,
    max: 10,
    label: "Beginner",
    messages: [
      "Every expert started exactly where you are now. Take it one lesson at a time. 🚀",
      "The first step is always the hardest — you've already taken it. Keep going!",
      "You're building a foundation that will support everything you learn next. Stay curious.",
    ],
  },
  {
    min: 11,
    max: 30,
    label: "Explorer",
    messages: [
      "You're gaining momentum — don't stop now. Each lesson brings you closer to your goal. 💪",
      "Progress is progress, no matter the pace. You're moving in the right direction.",
      "You've already learned more than you realize. Trust the process and keep showing up.",
    ],
  },
  {
    min: 31,
    max: 60,
    label: "Intermediate",
    messages: [
      "You're past the halfway mark in mindset — the skills are building up faster than you think. 🎯",
      "Consistency is your superpower right now. Keep the streak alive.",
      "You're in the zone where real understanding starts to click. Stay with it.",
    ],
  },
  {
    min: 61,
    max: 85,
    label: "Advanced",
    messages: [
      "You're in the final stretch — this is where most people slow down. Don't be most people. 🔥",
      "The gap between you and completion is smaller than the gap you've already closed.",
      "You've put in serious work to get here. Finish strong — it will be worth it.",
    ],
  },
  {
    min: 86,
    max: 100,
    label: "Expert",
    messages: [
      "Almost there! This final push defines you. Finish what you started. ✅",
      "You're at a level that most students never reach. That says a lot about you.",
      "Completion is close — and with it comes real, applicable knowledge. Don't stop now.",
    ],
  },
];

export function getMentorMessage(progress: number): { message: string; level: string } {
  const safeProgress = Math.max(0, Math.min(100, progress ?? 0));
  const range = levelRanges.find(
    (r) => safeProgress >= r.min && safeProgress <= r.max
  ) ?? levelRanges[0];

  const index = safeProgress % range.messages.length;
  return { message: range.messages[index], level: range.label };
}
