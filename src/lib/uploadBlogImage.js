import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

// Uploads an image for use inside a blog post.
//
// Everything is re-encoded in the browser before it leaves the device, which
// does three useful things at once:
//   1. Caps the dimensions. A photo straight off a phone is often 4000px wide
//      and several megabytes; dropping that into a post would hurt page speed
//      badly, and page speed feeds Core Web Vitals.
//   2. Strips EXIF. Phone photos frequently carry GPS coordinates, and a
//      therapy practice should not be publishing where a picture was taken.
//      Drawing to a canvas and re-encoding discards all of it.
//   3. Normalises format, so we are not serving 8MB PNGs.

const MAX_WIDTH = 1600;
const MAX_SOURCE_BYTES = 25 * 1024 * 1024; // reject before decoding something absurd
const QUALITY = 0.82;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

function slugifyFilename(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "image";
}

async function encode(canvas) {
  // WebP is far smaller at equivalent quality and is universally supported now,
  // but fall back to JPEG if the browser refuses to produce it.
  const webp = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", QUALITY)
  );
  if (webp) return { blob: webp, ext: "webp", type: "image/webp" };

  const jpeg = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", QUALITY)
  );
  if (jpeg) return { blob: jpeg, ext: "jpg", type: "image/jpeg" };

  throw new Error("This browser could not process the image. Try a JPEG or PNG.");
}

export async function uploadBlogImage(file) {
  if (!file) throw new Error("No file selected.");
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Please choose a JPEG, PNG, WebP, AVIF, or GIF image.");
  }
  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error("That image is very large. Please choose one under 25 MB.");
  }

  // imageOrientation honours the EXIF rotation flag before we discard EXIF,
  // so portrait phone photos don't end up sideways.
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("That file could not be read as an image.");
  }

  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const { blob, ext, type } = await encode(canvas);

  const path = `blog/images/${Date.now()}-${slugifyFilename(file.name)}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, {
    contentType: type,
    cacheControl: "public, max-age=31536000, immutable",
  });

  return { url: await getDownloadURL(storageRef), width, height };
}
