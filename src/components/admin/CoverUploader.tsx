"use client";

import { useState, useTransition } from "react";
import { removeCover, saveCover } from "@/app/admin/(protected)/covers/actions";
import { resizeCover } from "@/lib/resize-image";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Props = { eventId: string; hasCustom: boolean };

// Originals can be big phone photos; they're shrunk before upload, so this only guards memory.
const MAX_INPUT_BYTES = 25 * 1024 * 1024;
const INPUT_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/webp": "webp" };

export function CoverUploader({ eventId, hasCustom }: Props) {
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  async function onFile(file: File | undefined) {
    if (!file) return;
    if (!INPUT_TYPES.has(file.type)) return setMessage("Use a JPG, PNG, or WebP image.");
    if (file.size > MAX_INPUT_BYTES) return setMessage("That image is over 25 MB.");

    setMessage("Optimizing…");
    let image: Blob;
    try {
      image = await resizeCover(file);
    } catch {
      return setMessage("Couldn't read that image. Try a different file.");
    }

    setMessage("Uploading…");
    const supabase = createSupabaseBrowserClient();
    const path = `${eventId}-${Date.now()}.${EXT[image.type] ?? "webp"}`;
    const { error } = await supabase.storage
      .from("event-covers")
      .upload(path, image, { contentType: image.type, cacheControl: "31536000" });
    if (error) return setMessage("Upload failed. Are you signed in as an officer?");

    const { data } = supabase.storage.from("event-covers").getPublicUrl(path);
    startTransition(async () => {
      const res = await saveCover(eventId, data.publicUrl);
      setMessage(res.ok ? "Cover updated." : "Couldn't save the cover.");
    });
  }

  return (
    <div className="flex flex-col gap-2 text-sm">
      <label className="cursor-pointer text-primary-bright hover:underline">
        {hasCustom ? "Replace cover" : "Upload cover"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          disabled={pending}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>
      {hasCustom && (
        <button
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await removeCover(eventId);
              setMessage("Custom cover removed.");
            })
          }
          className="w-fit text-left text-fg-muted hover:text-fg"
        >
          Remove custom cover
        </button>
      )}
      {message && <span role="status" className="text-fg-subtle">{message}</span>}
    </div>
  );
}
