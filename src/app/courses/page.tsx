import { getCourses } from "@/data/courses";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata = {
  title: "Course Catalog | Course Platform",
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Courses" },
        ]}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-500">Pick up where you left off or start a new skill.</p>
      </div>
      
      <CourseGrid courses={courses} />
    </main>
  );
}
