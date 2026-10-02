"use client";

import { Modal } from "@/components/ui/Modal";
import { FileX } from "lucide-react";

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  title: string;
}

export function PDFViewerModal({ isOpen, onClose, pdfUrl, title }: PDFViewerModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="fullscreen">
      <div className="flex-grow h-full min-h-[60vh]">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title={title}
            className="w-full h-full min-h-screen border-0"
            style={{ minHeight: "calc(100vh - 65px)" }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-24 text-gray-400 gap-4">
            <FileX className="w-12 h-12" />
            <p className="text-sm font-medium">PDF not available for this lesson.</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
