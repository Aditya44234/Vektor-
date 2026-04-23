import { ThumbsDown, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";

type ReactionProps = {
  postId: string;
  currentUserId: string | null;
  likes: string[];
  piss: string[];
  onReactionChange?: (updatedPost: any) => void;
};

export default function ReactionButtons({
  postId,
  currentUserId,
  likes,
  piss,
  onReactionChange,
}: ReactionProps) {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localPiss, setLocalPiss] = useState(piss);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useHasLikes = currentUserId && localLikes.includes(currentUserId);
  const useHasPissed = currentUserId && localPiss.includes(currentUserId);

  const handleReaction = async (type: "like" | "piss") => {
    if (!currentUserId) {
      setError("Login to react");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          postId,
          type,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update reaction");
      }

      const data = await res.json();

      if (type === "like") {
        if (useHasLikes) {
          setLocalLikes(localLikes.filter((id) => id !== currentUserId));
        } else {
          setLocalLikes([...localLikes, currentUserId]);
        }
      } else {
        if (useHasPissed) {
          setLocalPiss(localPiss.filter((id) => id !== currentUserId));
        } else {
          setLocalPiss([...localPiss, currentUserId]);
        }
      }
    } catch (error) {
      setError("Failed to updqate  reaction");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 text-sm text-slate-400">
      {error && <p className="text-rose-400 text-xxs">{error}</p>}

      {/* Likes button */}
      <button
        onClick={() => handleReaction("like")}
        disabled={loading}
        className={`inline-flex items-center gap-1.5 transition ${
          useHasLikes ? "text-cyan-400" : "hover:text-cyan-300"
        } disabled:opacity-60`}
      >
        <ThumbsUpIcon className="h-4 w-4 cursor-pointer" />
        {localLikes.length}
      </button>

      {/* Piss or DislikeButton */}
      <button
        onClick={() => handleReaction("piss")}
        disabled={loading}
        className={`inline-flex items-center gap-1.5 transition ${
          useHasPissed
            ? "text-yellow-400"
            : "hover:text-yellow-300"
        } disabled:opacity-60`}
      >
        <ThumbsDown className="h-4 w-4 cursor-pointer" />
        {localPiss.length}
      </button>
    </div>
  );
}
