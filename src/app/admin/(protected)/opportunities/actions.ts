"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { parseOpportunityCsv } from "@/lib/opportunity-csv";
import { validateOpportunity } from "@/lib/opportunity-validate";

export type FormState = { ok: boolean; message: string };

function str(form: FormData, key: string, max: number): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function parse(form: FormData) {
  return validateOpportunity({
    title: str(form, "title", 160),
    org: str(form, "org", 120),
    url: str(form, "url", 2000),
    description: str(form, "description", 1500),
    category: str(form, "category", 32),
    deadline: str(form, "deadline", 10),
    published: form.get("published") === "on",
  });
}

function refresh() {
  revalidatePath("/opportunities");
  revalidatePath("/admin/opportunities");
}

/** `id` empty creates a post; otherwise updates it. */
export async function saveOpportunity(
  id: string | null,
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const parsed = parse(form);
  if ("error" in parsed) return { ok: false, message: parsed.error };

  const { error } = id
    ? await supabase.from("opportunities").update(parsed.values).eq("id", id)
    : await supabase.from("opportunities").insert(parsed.values);
  if (error) return { ok: false, message: "Couldn't save. Check your permissions and try again." };
  refresh();
  return { ok: true, message: id ? "Saved." : "Posted." };
}

export async function deleteOpportunity(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  await supabase.from("opportunities").delete().eq("id", id);
  refresh();
}

export async function setPublished(id: string, published: boolean): Promise<void> {
  const { supabase } = await requireAdmin();
  await supabase.from("opportunities").update({ published }).eq("id", id);
  refresh();
}

/** Bulk import from pasted CSV. Re-parsed here (never trust the client preview); all rows or none. */
export async function importOpportunities(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const raw = form.get("csv");
  const { rows, errors } = parseOpportunityCsv(typeof raw === "string" ? raw : "");
  if (errors.length) return { ok: false, message: `Nothing imported. ${errors[0]}` };
  if (rows.length === 0) return { ok: false, message: "Paste a header row and at least one row." };

  const { error } = await supabase.from("opportunities").insert(rows);
  if (error) return { ok: false, message: "Couldn't import. Check your permissions and try again." };
  refresh();
  return { ok: true, message: `Imported ${rows.length} ${rows.length === 1 ? "opportunity" : "opportunities"}.` };
}
