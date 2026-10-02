import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";
import { getStatusLabel } from "@/lib/course-utils";

export function CourseCard({ course }: { course: Course }) {
  const statusLabel = getStatusLabel(course.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="relative w-full aspect-video bg-gray-100">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-sm uppercase tracking-wider ${
              course.status === "completed"
                ? "bg-green-100 text-green-700"
                : course.status === "in-progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {course.status.replace("-", " ")}
          </span>
          <span className="text-sm font-bold text-gray-900">{course.progress}%</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {course.instructor}
          </span>
          <Link
            href={`/courses/${course.id}`}
            className={`text-sm font-semibold px-4 py-2 rounded-md transition-colors ${
              course.status === "completed"
                ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                : "bg-[var(--color-accent)] text-white hover:bg-red-700"
            }`}
          >
            {statusLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
