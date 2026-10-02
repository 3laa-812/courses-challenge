"use client";

import { useState, useEffect } from "react";
import { useSessionStorage } from "@/lib/useSessionStorage";
import { ChevronLeft, Clock } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "Among the following status of India, which one has the oldest rock formations in the country?",
    options: ["Asam", "Bahar", "Kamaltake", "Utter Pardesh"],
    correctIndex: 1,
  },
  {
    id: "q2",
    text: "Which of these is a key on-page SEO factor?",
    options: ["Server location", "Meta title and description", "Domain age only", "Social media followers"],
    correctIndex: 1,
  },
  {
    id: "q3",
    text: "What is a backlink?",
    options: [
      "A link within your own website",
      "A broken link on your site",
      "A link from another website to yours",
      "A link to a PDF file",
    ],
    correctIndex: 2,
  },
  {
    id: "q4",
    text: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<script>", "<css>", "<link>"],
    correctIndex: 0,
  },
  {
    id: "q5",
    text: "Which property is used to change the background color in CSS?",
    options: ["color", "bgcolor", "background-color", "bg-color"],
    correctIndex: 2,
  },
];

interface ExamState {
  answers: Record<string, number>;
  submitted: boolean;
}

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: string;
  lessonTitle: string;
}

export function ExamModal({ isOpen, onClose, lessonId }: ExamModalProps) {
  const storageKey = `exam-state-${lessonId}`;
  const [examState, setExamState, clearExamState] = useSessionStorage<ExamState>(storageKey, {
    answers: {},
    submitted: false,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(572); // 9:32 starting time

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Timer logic
  useEffect(() => {
    if (!isOpen || examState.submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          setExamState({ ...examState, submitted: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, examState.submitted, timeLeft, setExamState]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!isOpen) return null;

  const currentQuestion = mockQuestions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (examState.submitted) return;
    setExamState({
      ...examState,
      answers: { ...examState.answers, [currentQuestion.id]: index },
    });
  };

  const handleNext = () => {
    if (currentIndex < mockQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setExamState({ ...examState, submitted: true });
    }
  };

  const score = examState.submitted
    ? mockQuestions.filter((q) => examState.answers[q.id] === q.correctIndex).length
    : 0;

  if (examState.submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4c63d2]">
        <div className="bg-white p-10 rounded-3xl max-w-md text-center mx-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Exam Completed!</h2>
          <div className="text-6xl font-black text-[#4c63d2] mb-6">
            {score}/{mockQuestions.length}
          </div>
          <p className="text-gray-600 mb-8 font-medium">
            Your progress has been saved. You can now return to the course.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => { clearExamState(); setCurrentIndex(0); }}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50"
            >
              Retake
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl bg-[#4c63d2] text-white font-bold hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#4c63d2] overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between p-6 w-full max-w-xl mx-auto">
        <button onClick={onClose} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 bg-[#facc15] px-4 py-2 rounded-lg text-white font-bold tracking-widest shadow-[0_0_15px_rgba(250,204,21,0.5)]">
          <Clock className="w-5 h-5" />
          <span>{formatTime(timeLeft)}</span>
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Pagination circles */}
      <div className="flex justify-center gap-3 md:gap-4 mb-6">
        {mockQuestions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-colors ${
              idx === currentIndex
                ? "bg-white text-[#4c63d2] font-bold"
                : "border border-white/50 text-white font-medium hover:bg-white/10"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      <div className="flex-grow flex flex-col items-center px-4 md:px-0">
        <div className="bg-white w-full max-w-xl rounded-t-[32px] md:rounded-3xl p-8 shadow-2xl flex-grow md:flex-grow-0 mb-0 md:mb-8 pb-32 md:pb-8">
          <div className="text-xl font-bold text-gray-800 mb-6 flex gap-2">
            <span>{currentIndex + 1}.</span>
            <h2 className="leading-relaxed">{currentQuestion.text}</h2>
          </div>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = examState.answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full flex items-center rounded-xl border text-left transition-all overflow-hidden ${
                    isSelected
                      ? "bg-[#637cf9] border-[#637cf9] text-white shadow-md shadow-blue-500/20"
                      : "bg-white border-gray-100 hover:border-gray-300 text-gray-700 shadow-sm"
                  }`}
                >
                  <div className={`p-4 border-r flex items-center justify-center ${isSelected ? "border-white/20" : "border-gray-100"}`}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${isSelected ? "border-2 border-white" : "border-2 border-blue-400"}`}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                    </div>
                  </div>
                  <div className="px-5 py-4 font-medium flex-grow">
                    {option}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next / Submit Button */}
          <div className="mt-10">
            <button
              onClick={handleNext}
              disabled={examState.answers[currentQuestion.id] === undefined}
              className="w-full bg-[#facc15] hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-yellow-500/30 text-lg"
            >
              {currentIndex < mockQuestions.length - 1 ? "Next Question" : "Submit Exam"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
