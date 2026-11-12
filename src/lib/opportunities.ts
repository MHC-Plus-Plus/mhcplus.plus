import {
  OPPORTUNITY_COLUMNS,
  isOpen,
  todayNY,
  toOpportunity,
  type OpportunityRow,
} from "@/lib/opportunity-meta";
import { publicClient } from "@/lib/supabase/server";
import type { Opportunity } from "@/lib/types";

/** Published, still-open posts, newest first. Empty when Supabase is unavailable. */
export async function getOpportunities(): Promise<Opportunity[]> {
  const supabase = publicClient();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("opportunities")
      .select(OPPORTUNITY_COLUMNS)
      .eq("published", true)
      .order("posted_at", { ascending: false })
      .abortSignal(AbortSignal.timeout(5000));
    if (error || !data) return [];
    const today = todayNY();
    return (data as OpportunityRow[]).map(toOpportunity).filter((o) => isOpen(o, today));
  } catch {
    return [];
  }
}
