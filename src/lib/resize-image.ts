/** Browser-only. Shrinks a cover before upload so visitors never download a multi-MB original. */

const MAX_WIDTH = 1280;
const WEBP_QUALITY = 0.82;
const JPEG_QUALITY = 0.85;

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/**
 * Downscales to at most MAX_WIDTH wide (never upscales) and re-encodes as WebP.
 * Falls back to JPEG on browsers whose canvas can't encode WebP. EXIF rotation
 * is applied by createImageBitmap, so phone photos come out upright.
 */
export async function resizeCover(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    let blob = await toBlob(canvas, "image/webp", WEBP_QUALITY);
    if (!blob || blob.type !== "image/webp") blob = await toBlob(canvas, "image/jpeg", JPEG_QUALITY);
    if (!blob) throw new Error("Couldn't encode image");
    return blob;
  } finally {
    bitmap.close();
  }
}
