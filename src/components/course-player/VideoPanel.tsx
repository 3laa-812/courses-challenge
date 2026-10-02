"use client";

import Image from "next/image";
import { Play, Maximize2, Minimize2 } from "lucide-react";
import { List, MessageSquare, HelpCircle, Trophy } from "lucide-react";

interface VideoPanelProps {
  thumbnail: string;
  title: string;
  isWide: boolean;
  onToggleWide: () => void;
  onOpenQuestion: () => void;
  onOpenLeaderboard: () => void;
}

export function VideoPanel({
  thumbnail,
  title,
  isWide,
  onToggleWide,
  onOpenQuestion,
  onOpenLeaderboard,
}: VideoPanelProps) {
  const handleFullscreen = async () => {
    const el = document.getElementById("video-container");
    if (!el) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      // Fullscreen not supported — silent fail
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "prefers-reduced-motion" in document.documentElement ? "auto" : "smooth" });
  };

  return (
    <div className="mb-8">
      {/* Video Player */}
      <div
        id="video-container"
        className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden cursor-pointer group"
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          style={{ opacity: 0.55 }}
        />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <Play
              className="w-6 h-6 ml-1"
              style={{ color: "#c94b4b", fill: "#c94b4b" }}
            />
          </div>
        </div>
        {/* Maximize */}
        <button
          onClick={(e) => { e.stopPropagation(); handleFullscreen(); }}
          aria-label="Toggle fullscreen"
          className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Action Icons Row — matches design nav icons */}
      <div className="mt-5 flex items-center gap-3">
        {/* Wide Mode (desktop only) */}
        <button
          onClick={onToggleWide}
          aria-label={isWide ? "Exit wide mode" : "Wide mode"}
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          {isWide ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          <span>{isWide ? "Normal" : "Wide"}</span>
        </button>

        <div className="flex items-center gap-2">
          <ActionIcon
            icon={<List className="w-5 h-5" />}
            label="Curriculum"
            onClick={() => scrollTo("curriculum-section")}
          />
          <ActionIcon
            icon={<MessageSquare className="w-5 h-5" />}
            label="Comments"
            onClick={() => scrollTo("comments-section")}
          />
          <ActionIcon
            icon={<HelpCircle className="w-5 h-5" />}
            label="Ask a Question"
            onClick={onOpenQuestion}
          />
          <ActionIcon
            icon={<Trophy className="w-5 h-5" />}
            label="Leaderboard"
            onClick={onOpenLeaderboard}
          />
        </div>
      </div>
    </div>
  );
}

function ActionIcon({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-gray-500 hover:text-[var(--color-primary)] hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      {icon}
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </button>
  );
}
