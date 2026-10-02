"use client";

import { useState } from "react";
import Image from "next/image";
import { Comment as CommentType } from "@/types/course";
import { StarRating } from "@/components/ui/StarRating";
import { formatDate } from "@/lib/course-utils";

export function CommentsSection({ initialComments }: { initialComments: CommentType[] }) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: `new-${Date.now()}`,
        authorName: "You",
        authorAvatar: "/images/avatars/avatar-1.svg",
        date: new Date().toISOString(),
        rating: 5,
        text: newComment,
      },
    ]);
    setNewComment("");
  };

  return (
    <div id="comments-section" className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Comments</h2>

      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-6 py-8 border-b border-gray-100 last:border-0">
            <div className="flex-shrink-0">
              <Image
                src={comment.authorAvatar}
                alt={comment.authorName}
                width={80}
                height={80}
                className="rounded-full object-cover bg-gray-100"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-gray-800 text-[17px] mb-1">
                {comment.authorName}
              </h4>
              <p className="text-[15px] text-gray-400 mb-4">{formatDate(comment.date)}</p>
              <p className="text-[15px] text-[#888888] leading-loose">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label htmlFor="comment-input" className="sr-only">Write a comment</label>
        <textarea
          id="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent min-h-[120px] resize-y"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[var(--color-accent)] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Review →
          </button>
        </div>
      </form>
    </div>
  );
}
