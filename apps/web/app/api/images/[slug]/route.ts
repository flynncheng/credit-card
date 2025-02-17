import { appConfig } from "@/app.config";
import { promises as fs } from "fs";
import mime from "mime";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Define the path to private images directory
  const imagePath = path.join(
    process.cwd(),
    `private/${appConfig.client.name?.toLowerCase()}/${slug}`,
  );

  try {
    const imageBuffer = await fs.readFile(imagePath);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": mime.getType(imagePath) || "application/octet-stream",
      },
    });
  } catch (error) {
    console.log(error, "error");
    return new NextResponse("Image not found", { status: 404 });
  }
}
