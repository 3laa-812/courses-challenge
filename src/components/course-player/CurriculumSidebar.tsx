"use client";

import { useState } from "react";
import { Course, Lesson, WeekSection as WeekSectionType } from "@/types/course";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Lock, FileText, PlayCircle, HelpCircle, ChevronDown } from "lucide-react";
import { getMentorMessage } from "@/data/mentor-messages";

interface CurriculumSidebarProps {
  course: Course;
  activeLessonId: string;
  onSelectLesson: (id: string) => void;
  onOpenPDF: (lessonId: string, title: string) => void;
  onOpenExam: (lessonId: string, title: string) => void;
}

export function CurriculumSidebar({
  course,
  activeLessonId,
  onSelectLesson,
  onOpenPDF,
  onOpenExam,
}: CurriculumSidebarProps) {
  const { message, level } = getMentorMessage(course.progress);

  return (
    <div id="curriculum-section" className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Topics for This Course</h2>
        <ProgressBar progress={course.progress} level={level} />
      </div>

      {/* Mentor message */}
      <div className="mx-6 mb-6 px-4 py-3 bg-teal-50 rounded-xl border border-teal-100">
        <p className="text-xs font-bold text-teal-700 mb-1 uppercase tracking-wide">
          A Message from Eng. Ali Shaheen
        </p>
        <p className="text-sm text-teal-800 leading-relaxed">{message}</p>
      </div>

      {/* Sections */}
      <div className="divide-y divide-gray-100">
        {course.sections.map((section, idx) => (
          <WeekSection
            key={section.id}
            section={section}
            activeLessonId={activeLessonId}
            onSelectLesson={onSelectLesson}
            onOpenPDF={onOpenPDF}
            onOpenExam={onOpenExam}
            defaultExpanded={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}

function WeekSection({
  section,
  activeLessonId,
  onSelectLesson,
  onOpenPDF,
  onOpenExam,
  defaultExpanded,
}: {
  section: WeekSectionType;
  activeLessonId: string;
  onSelectLesson: (id: string) => void;
  onOpenPDF: (lessonId: string, title: string) => void;
  onOpenExam: (lessonId: string, title: string) => void;
  defaultExpanded: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div>
      <button
        className="w-full px-6 py-4 flex items-start justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`section-${section.id}`}
      >
        <div>
          <h3 className="font-bold text-gray-900 text-[15px]">{section.title}</h3>
          {section.description && (
            <p className="text-xs text-gray-400 mt-1 leading-snug max-w-[220px]">{section.description}</p>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 ml-4 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div id={`section-${section.id}`} className="divide-y divide-gray-100">
          {section.lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isActive={activeLessonId === lesson.id}
              onSelect={onSelectLesson}
              onOpenPDF={onOpenPDF}
              onOpenExam={onOpenExam}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LessonItem({
  lesson,
  isActive,
  onSelect,
  onOpenPDF,
  onOpenExam,
}: {
  lesson: Lesson;
  isActive: boolean;
  onSelect: (id: string) => void;
  onOpenPDF: (lessonId: string, title: string) => void;
  onOpenExam: (lessonId: string, title: string) => void;
}) {
  const hasBadges = (lesson.questions !== undefined && lesson.questions >= 0) || !!lesson.duration;

  const handleClick = () => {
    if (lesson.isLocked) return;
    if (lesson.type === "quiz") {
      onOpenExam(lesson.id, lesson.title);
    } else if (lesson.type === "document") {
      onOpenPDF(lesson.id, lesson.title);
    } else {
      onSelect(lesson.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={lesson.isLocked}
      className={`w-full px-6 py-3.5 flex items-center text-left transition-colors ${
        isActive ? "bg-teal-50/70" : "hover:bg-gray-50"
      } ${lesson.isLocked ? "cursor-default" : "cursor-pointer"}`}
    >
      {/* Icon */}
      <span
        className={`flex-shrink-0 mr-3 ${
          isActive ? "text-[var(--color-primary)]" : "text-[var(--color-primary)] opacity-70"
        }`}
      >
        {lesson.type === "video" ? (
          <PlayCircle className="w-[18px] h-[18px]" />
        ) : lesson.type === "quiz" ? (
          <HelpCircle className="w-[18px] h-[18px]" />
        ) : (
          <FileText className="w-[18px] h-[18px]" />
        )}
      </span>

      {/* Title — grows */}
      <span
        className={`flex-grow text-sm leading-snug ${
          isActive ? "font-semibold text-[var(--color-primary)]" : "font-medium text-gray-700"
        }`}
      >
        {lesson.title}
      </span>

      {/* Right side: badges stacked OR lock icon */}
      {lesson.isLocked ? (
        <Lock className="flex-shrink-0 w-4 h-4 text-gray-300 ml-3" />
      ) : hasBadges ? (
        <div className="flex flex-col items-end gap-1 ml-3 flex-shrink-0">
          {lesson.questions !== undefined && (
            <span className="text-[10px] font-bold text-[var(--color-primary)] bg-teal-50 px-2 py-0.5 rounded whitespace-nowrap">
              {lesson.questions} QUESTION
            </span>
          )}
          {lesson.duration && (
            <span className="text-[10px] font-bold text-[var(--color-accent)] bg-red-50 px-2 py-0.5 rounded whitespace-nowrap">
              {lesson.duration}
            </span>
          )}
        </div>
      ) : null}
    </button>
  );
}
