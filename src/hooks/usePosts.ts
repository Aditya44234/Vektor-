"use client";

import { useCallback, useEffect, useState } from "react";
import type { Post } from "../types/post.types";
import { getFeedAPI } from "../services/post.api";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFeedAPI();
      setPosts(data.posts ?? []);
    } catch {
      console.error("Error fetching posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, refetch: fetchPosts };
}
