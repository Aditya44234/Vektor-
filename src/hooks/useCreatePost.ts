"use client";

import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createPostAPI } from "../services/post.api";
import { uploadImageAPI } from "../services/upload.api";

export function useCreatePost(refetch: () => void) {
  const { token, isReady } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(
    async (content: string, file?: File) => {
      const trimmedContent = content.trim();

      if (!trimmedContent) {
        setError("Write something before posting.");
        return false;
      }

      if (!token) {
        setError(
          isReady ? "Log in to publish a post." : "Checking your session..."
        );
        return false;
      }

      try {
        setLoading(true);
        setError(null);

        let imageUrl = "";

        if (file) {
          const uploadRes = await uploadImageAPI(file);
          imageUrl = uploadRes.url;
        }

        await createPostAPI(
          imageUrl
            ? { content: trimmedContent, imageUrl }
            : { content: trimmedContent },
          token
        );
        await refetch();
        return true;
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error creating post."
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isReady, refetch, token]
  );

  return { createPost, loading, error };
}
