import { notFound } from "next/navigation";
import { getCourseById } from "@/data/courses";
import { CoursePlayer } from "@/components/course-player/CoursePlayer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  
  if (!course) {
    return { title: "Course Not Found" };
  }
  
  return {
    title: `${course.title} | Course Platform`,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: "Course Details" },
        ]}
      />
      
      {/* Desktop Title */}
      <h1 className="hidden lg:block text-3xl font-bold text-gray-900 mb-8">
        {course.title}
      </h1>
      
      <CoursePlayer course={course} />
    </main>
  );
}
