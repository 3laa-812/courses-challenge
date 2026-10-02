import type { Course, WeekSection, Lesson } from "@/types/course";

export function calculateProgress(sections: WeekSection[]): number {
  if (!sections || sections.length === 0) return 0;
  
  let totalLessons = 0;
  let completedLessons = 0;
  
  sections.forEach((section) => {
    section.lessons.forEach((lesson) => {
      totalLessons++;
      if (lesson.isCompleted) {
        completedLessons++;
      }
    });
  });
  
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
}

export function getStatusLabel(status: Course["status"]): string {
  switch (status) {
    case "not-started":
      return "Start";
    case "in-progress":
      return "Continue";
    case "completed":
      return "Review";
    default:
      return "Start";
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
