import { promises as fs } from "node:fs";
import path from "node:path";
import type { TeamMember } from "@/lib/types";

const TEAM_DIR = path.join(process.cwd(), "content", "team");

/**
 * Splits `---` frontmatter from the body. Supports flat `key: value` lines
 * only (optionally quoted), which is all the content files use.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    data[m[1]] = m[2].trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  return { data, body: match[2].trim() };
}

/** All eboard members from content/team/*.mdx, sorted by `order` then name. */
export async function getTeam(): Promise<TeamMember[]> {
  let files: string[];
  try {
    files = await fs.readdir(TEAM_DIR);
  } catch {
    return [];
  }

  const members = await Promise.all(
    files
      .filter((f) => /\.mdx?$/.test(f))
      .map(async (file): Promise<TeamMember | null> => {
        const { data, body } = parseFrontmatter(
          await fs.readFile(path.join(TEAM_DIR, file), "utf8"),
        );
        if (!data.name || !data.role) {
          console.warn(`content/team/${file}: missing name or role, skipping`);
          return null;
        }
        const order = Number(data.order);
        return {
          slug: file.replace(/\.mdx?$/, ""),
          name: data.name,
          role: data.role,
          campus: data.campus || null,
          photo: data.photo || null,
          linkedin: data.linkedin || null,
          github: data.github || null,
          order: Number.isFinite(order) && data.order ? order : 999,
          bio: body,
        };
      }),
  );

  return members
    .filter((m): m is TeamMember => m !== null)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}
