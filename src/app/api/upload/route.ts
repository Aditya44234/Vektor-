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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise<UploadResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "pulsepost" }, (error, result) => {
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
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return Response.json(
      { error: getErrorMessage(error, "Unable to upload the image.") },
      { status: 500 }
    );
  }
}
