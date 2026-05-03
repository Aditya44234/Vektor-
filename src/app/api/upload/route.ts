import cloudinary from "@/src/lib/cloudinary";
import { connectDB } from "@/src/lib/db";
import { getErrorMessage } from "@/src/utils/errors";

type UploadResult = {
  secure_url: string;
};

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "File is required" }, { status: 400 });
    }

    // Validate file type
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      return Response.json(
        { error: "Only image and video files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (100MB max)
    const MAX_SIZE = 30 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return Response.json(
        { error: "File size must be less than 30MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise<UploadResult>((resolve, reject) => {
      const uploadOptions: any = {
        folder: "pulsepost",
        resource_type: isVideo ? "video" : "auto" as const,
      };

      cloudinary.uploader
        .upload_stream(uploadOptions, (error, result) => {
          if (error || !result?.secure_url) {
            reject(error ?? new Error("Upload failed"));
            return;
          }

          resolve({ secure_url: result.secure_url });
        })
        .end(buffer);
    });

    return Response.json(
      {
        message: "Upload successful",
        url: uploadResponse.secure_url,
        type: isVideo ? "video" : "image",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return Response.json(
      { error: getErrorMessage(error, "Unable to upload the file.") },
      { status: 500 }
    );
  }
}