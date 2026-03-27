export async function getFeedAPI() {
  const res = await fetch("/api/posts/feed");
  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.error || "Unable to load the feed.");
  }

  return payload;
}

export async function createPostAPI(
  data: { content: string; imageUrl?: string },
  token: string
) {
  const res = await fetch("/api/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.error || "Unable to create the post.");
  }

  return payload;
}
