"use client";

import { useState, useEffect } from "react";
import { Course } from "@/types/course";
import { VideoPanel } from "./VideoPanel";
import { CourseMaterials } from "./CourseMaterials";
import { CommentsSection } from "./CommentsSection";
import { CurriculumSidebar } from "./CurriculumSidebar";
import { AskQuestionModal } from "./AskQuestionModal";
import { LeaderboardModal } from "./LeaderboardModal";
import { PDFViewerModal } from "./PDFViewerModal";
import { ExamModal } from "./ExamModal";

type ModalState =
  | { type: "none" }
  | { type: "question" }
  | { type: "leaderboard" }
  | { type: "pdf"; lessonId: string; title: string }
  | { type: "exam"; lessonId: string; title: string };

export function CoursePlayer({ course }: { course: Course }) {
  const [activeLessonId, setActiveLessonId] = useState<string>("");
  const [isWide, setIsWide] = useState(false);
  const [modal, setModal] = useState<ModalState>({ type: "none" });

  useEffect(() => {
    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        if (!lesson.isLocked) {
          setActiveLessonId(lesson.id);
          return;
        }
      }
    }
  }, [course]);

  const closeModal = () => setModal({ type: "none" });

  return (
    <>
      {/* Mobile sticky player */}
      <div className="lg:hidden sticky top-0 z-40 bg-white -mx-4 px-4 shadow-sm">
        <div className="pt-3 pb-2">
          <h1 className="text-base font-bold text-gray-900 mb-3 truncate">{course.title}</h1>
          <VideoPanel
            thumbnail={course.thumbnail}
            title={course.title}
            isWide={false}
            onToggleWide={() => {}}
            onOpenQuestion={() => setModal({ type: "question" })}
            onOpenLeaderboard={() => setModal({ type: "leaderboard" })}
          />
        </div>
      </div>

      {/* Desktop layout */}
      <div className={`hidden lg:flex gap-8 transition-all duration-300 ${isWide ? "flex-col" : "flex-row"}`}>
        {/* Left / Top column */}
        <div className={isWide ? "w-full" : "w-[60%]"}>
          <VideoPanel
            thumbnail={course.thumbnail}
            title={course.title}
            isWide={isWide}
            onToggleWide={() => setIsWide((w) => !w)}
            onOpenQuestion={() => setModal({ type: "question" })}
            onOpenLeaderboard={() => setModal({ type: "leaderboard" })}
          />
          {!isWide && (
            <>
              <CourseMaterials
                materials={course.materials}
                price={course.price}
                instructor={course.instructor}
              />
              <CommentsSection initialComments={course.comments} />
            </>
          )}
        </div>

        {/* Right / Bottom column */}
        <div className={isWide ? "w-full" : "w-[40%]"}>
          <CurriculumSidebar
            course={course}
            activeLessonId={activeLessonId}
            onSelectLesson={setActiveLessonId}
            onOpenPDF={(id, title) => setModal({ type: "pdf", lessonId: id, title })}
            onOpenExam={(id, title) => setModal({ type: "exam", lessonId: id, title })}
          />
          {isWide && (
            <div className="mt-8">
              <CourseMaterials
                materials={course.materials}
                price={course.price}
                instructor={course.instructor}
              />
              <CommentsSection initialComments={course.comments} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile scrollable content (below sticky player) */}
      <div className="lg:hidden mt-4">
        <CourseMaterials
          materials={course.materials}
          price={course.price}
          instructor={course.instructor}
        />
        <CurriculumSidebar
          course={course}
          activeLessonId={activeLessonId}
          onSelectLesson={setActiveLessonId}
          onOpenPDF={(id, title) => setModal({ type: "pdf", lessonId: id, title })}
          onOpenExam={(id, title) => setModal({ type: "exam", lessonId: id, title })}
        />
        <div className="mt-6">
          <CommentsSection initialComments={course.comments} />
        </div>
      </div>

      {/* Modals */}
      <AskQuestionModal isOpen={modal.type === "question"} onClose={closeModal} />
      <LeaderboardModal isOpen={modal.type === "leaderboard"} onClose={closeModal} />
      <PDFViewerModal
        isOpen={modal.type === "pdf"}
        onClose={closeModal}
        title={modal.type === "pdf" ? modal.title : ""}
        pdfUrl={undefined}
      />
      {modal.type === "exam" && (
        <ExamModal
          isOpen
          onClose={closeModal}
          lessonId={modal.lessonId}
          lessonTitle={modal.title}
        />
      )}
    </>
  );
}
