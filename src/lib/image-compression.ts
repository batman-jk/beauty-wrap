import { supabase } from "./supabase/client";

export interface CompressionResult {
  file: File;
  previewUrl: string;
  originalSize: number;
  compressedSize: number;
}

/**
 * Compresses an image in the browser using HTML5 Canvas.
 * - Scales down to max ~1200px (width or height)
 * - Compresses to ~80% quality WebP (fallback to JPEG)
 * - Dramatically shrinks phone photos from 10MB to ~150KB
 */
export async function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<CompressionResult> {
  const originalSize = file.size;

  // If not an image, return as-is
  if (!file.type.startsWith("image/")) {
    return {
      file,
      previewUrl: URL.createObjectURL(file),
      originalSize,
      compressedSize: originalSize,
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect-ratio preserved dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve({
            file,
            previewUrl: URL.createObjectURL(file),
            originalSize,
            compressedSize: originalSize,
          });
        }

        // Smooth image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve({
                file,
                previewUrl: URL.createObjectURL(file),
                originalSize,
                compressedSize: originalSize,
              });
            }

            const cleanBaseName = file.name
              .replace(/\.[^/.]+$/, "")
              .toLowerCase()
              .replace(/[^a-z0-9_-]/g, "-");
            const newFileName = `${cleanBaseName}.webp`;

            const compressedFile = new File([blob], newFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            resolve({
              file: compressedFile,
              previewUrl: URL.createObjectURL(blob),
              originalSize,
              compressedSize: compressedFile.size,
            });
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => {
        resolve({
          file,
          previewUrl: URL.createObjectURL(file),
          originalSize,
          compressedSize: originalSize,
        });
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      resolve({
        file,
        previewUrl: URL.createObjectURL(file),
        originalSize,
        compressedSize: originalSize,
      });
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a compressed image to Supabase Storage in the `product-images` bucket.
 * Returns the public URL of the uploaded image.
 */
export async function uploadProductImage(file: File): Promise<string> {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  const ext = file.name.split(".").pop() || "webp";
  const filePath = `products/${timestamp}-${randomSuffix}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "31536000",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
