
export async function uploadImageAPI(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.error || "Unable to upload the image.");
  }

  return payload;
}


export async function uploadAPI(file: File):  Promise<{ url: string; type: "image" | "video" }> {
  const formData = new FormData();

  formData.append("file", file)

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.error || " Unable to upload the fiile")
  }

  return {
    url:payload.url,
    type:payload.type,
  }
}
