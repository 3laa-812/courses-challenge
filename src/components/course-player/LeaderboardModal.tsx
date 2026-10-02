"use client";

import { Modal } from "@/components/ui/Modal";
import { leaderboardData } from "@/data/leaderboard";
import { Trophy } from "lucide-react";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Leaderboard">
      <div className="p-6">
        <p className="text-xs text-gray-400 mb-6">
          Sample rankings — not live data. Keep learning to climb up! 🏆
        </p>
        <div className="space-y-3">
          {leaderboardData.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                entry.isCurrentUser
                  ? "bg-teal-50 border border-teal-100"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="w-8 text-center flex-shrink-0">
                {entry.rank <= 3 ? (
                  <Trophy
                    className={`w-5 h-5 mx-auto ${
                      entry.rank === 1
                        ? "text-yellow-400"
                        : entry.rank === 2
                        ? "text-gray-400"
                        : "text-amber-600"
                    }`}
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-400">#{entry.rank}</span>
                )}
              </div>
              <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                {entry.avatar}
              </div>
              <div className="flex-grow min-w-0">
                <p className={`text-sm font-semibold truncate ${entry.isCurrentUser ? "text-teal-700" : "text-gray-800"}`}>
                  {entry.name}
                  {entry.isCurrentUser && <span className="ml-2 text-xs font-normal text-teal-500">(You)</span>}
                </p>
                <p className="text-xs text-gray-400">{entry.level}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-900">{entry.points.toLocaleString()}</p>
                <p className="text-xs text-gray-400">pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
