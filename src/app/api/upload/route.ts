"use server";

import { UploadImage } from "@/app/lib/upload-image";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ message: "No image provided" }, { status: 400 });
    }

    const uploadResult = await UploadImage(image, "job-board");

    if (!uploadResult) {
      return NextResponse.json({ message: "Upload failed: No result returned" }, { status: 500 });
    }

<<<<<<< HEAD
=======
    console.log("Image Result: ", uploadResult);
>>>>>>> e3f0de84ed5539a59d10e3327bad789e3a5bcae1

    return NextResponse.json({ message: "Upload successful", data: uploadResult }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Upload failed", error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}