"use client";

import { useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { useSessionStorage } from "@/lib/useSessionStorage";
import { StarRating } from "@/components/ui/StarRating";

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AskQuestionModal({ isOpen, onClose }: AskQuestionModalProps) {
  const [draft, setDraft, clearDraft] = useSessionStorage("ask-question-draft", "");
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    clearDraft();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ask a Question">
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-6">
          Your question will be reviewed. This is a local draft — questions are not sent to any server.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="question-input" className="block text-sm font-semibold text-gray-700 mb-2">
              Your Question
            </label>
            <textarea
              id="question-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question here..."
              rows={6}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-y"
            />
          </div>
          {!draft.trim() && (
            <p className="text-xs text-gray-400">Please write a question before submitting.</p>
          )}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => { clearDraft(); onClose(); }}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              Discard & Close
            </button>
            <button
              type="submit"
              disabled={!draft.trim()}
              className="bg-[var(--color-accent)] hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
            >
              Submit Question →
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
