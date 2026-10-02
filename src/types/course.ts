export type CourseStatus = "not-started" | "in-progress" | "completed";

export type Lesson = {
  id: string;
  title: string;
  type: "video" | "document" | "quiz";
  duration?: string;
  questions?: number;
  isLocked: boolean;
  isCompleted: boolean;
  order: number;
};

export type WeekSection = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type CourseMaterial = {
  duration: string;
  lessons: number;
  enrolled: string;
  language: string;
};

export type Comment = {
  id: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  rating: number;
  text: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  price: string;
  status: CourseStatus;
  progress: number;
  sections: WeekSection[];
  materials: CourseMaterial;
  comments: Comment[];
};
