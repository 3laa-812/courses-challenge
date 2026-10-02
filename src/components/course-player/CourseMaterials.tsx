import { CourseMaterial } from "@/types/course";
import { Clock, BookOpen, Users, Globe, Tag, User } from "lucide-react";

export function CourseMaterials({ 
  materials, 
  price, 
  instructor 
}: { 
  materials: CourseMaterial;
  price: string;
  instructor: string;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6 hidden md:block">Course Materials</h2>
      
      {/* Desktop Layout: 2 side-by-side cards */}
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Duration</p>
              <p className="font-semibold text-gray-900">{materials.duration}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Lessons</p>
              <p className="font-semibold text-gray-900">{materials.lessons}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Enrolled</p>
              <p className="font-semibold text-gray-900">{materials.enrolled}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Language</p>
              <p className="font-semibold text-gray-900">{materials.language}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout: 1 stacked card "Course Includes" */}
      <div className="md:hidden bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Course Includes</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <Tag className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Price:</span>
            <span className="text-sm font-bold text-gray-900 ml-auto">{price}</span>
          </li>
          <li className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Instructor:</span>
            <span className="text-sm font-bold text-gray-900 ml-auto">{instructor}</span>
          </li>
          <li className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Duration:</span>
            <span className="text-sm font-bold text-gray-900 ml-auto">{materials.duration}</span>
          </li>
          <li className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Lessons:</span>
            <span className="text-sm font-bold text-gray-900 ml-auto">{materials.lessons}</span>
          </li>
          <li className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Enrolled:</span>
            <span className="text-sm font-bold text-gray-900 ml-auto">{materials.enrolled}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
