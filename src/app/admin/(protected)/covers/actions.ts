"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { isEventType } from "@/lib/event-types";

function refresh() {
  revalidatePath("/events");
  revalidatePath("/feedback/[id]", "page");
  revalidatePath("/");
  revalidatePath("/admin/covers");
}

/** Only accept images that live in our own public bucket. */
function isOurCover(url: string): boolean {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(base) && url.startsWith(`${base}/storage/v1/object/public/event-covers/`);
}

export async function saveCover(eventId: string, imageUrl: string): Promise<{ ok: boolean }> {
  const { supabase } = await requireAdmin();
  if (!/^\d+$/.test(eventId) || !isOurCover(imageUrl)) return { ok: false };
  const { error } = await supabase
    .from("event_covers")
    .upsert({ event_id: eventId, image_url: imageUrl, updated_at: new Date().toISOString() });
  if (error) return { ok: false };
  refresh();
  return { ok: true };
}

export async function removeCover(eventId: string): Promise<void> {
  const { supabase } = await requireAdmin();
  if (!/^\d+$/.test(eventId)) return;
  await supabase.from("event_covers").delete().eq("event_id", eventId);
  refresh();
}

/** `null` clears the override so the CampusGroups type applies again. */
export async function setEventType(eventId: string, type: string | null): Promise<{ ok: boolean }> {
  const { supabase } = await requireAdmin();
  if (!/^\d+$/.test(eventId)) return { ok: false };
  if (type === null) {
    const { error } = await supabase.from("event_types").delete().eq("event_id", eventId);
    if (error) return { ok: false };
  } else {
    if (!isEventType(type)) return { ok: false };
    const { error } = await supabase
      .from("event_types")
      .upsert({ event_id: eventId, event_type: type, updated_at: new Date().toISOString() });
    if (error) return { ok: false };
  }
  refresh();
  return { ok: true };
}
