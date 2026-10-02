import { Course } from "@/types/course";
import { CourseCard } from "./CourseCard";

export function CourseGrid({ courses }: { courses: Course[] }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No courses available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
