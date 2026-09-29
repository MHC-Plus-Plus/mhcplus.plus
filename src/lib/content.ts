import { promises as fs } from "node:fs";
import path from "node:path";
import type { Highlight, Page, TeamMember } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const TEAM_DIR = path.join(CONTENT_DIR, "team");
const HIGHLIGHTS_DIR = path.join(CONTENT_DIR, "highlights");

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

/** A single page from content/pages/<slug>.mdx, or null if missing. */
export async function getPage(slug: string): Promise<Page | null> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, "pages", `${slug}.mdx`), "utf8");
    const { data, body } = parseFrontmatter(raw);
    return { slug, meta: data, body };
  } catch {
    return null;
  }
}

/** All highlights from content/highlights/*.mdx, newest first. */
export async function getHighlights(): Promise<Highlight[]> {
  let files: string[];
  try {
    files = await fs.readdir(HIGHLIGHTS_DIR);
  } catch {
    return [];
  }

  const items = await Promise.all(
    files
      .filter((f) => /\.mdx?$/.test(f))
      .map(async (file): Promise<Highlight | null> => {
        const { data, body } = parseFrontmatter(
          await fs.readFile(path.join(HIGHLIGHTS_DIR, file), "utf8"),
        );
        if (!data.title || !data.date) {
          console.warn(`content/highlights/${file}: missing title or date, skipping`);
          return null;
        }
        const attendance = Number(data.attendance);
        return {
          slug: file.replace(/\.mdx?$/, ""),
          title: data.title,
          date: data.date,
          cover: data.cover || null,
          photos: (data.photos ?? "").split(",").map((u) => u.trim()).filter(Boolean),
          attendance: data.attendance && Number.isFinite(attendance) ? attendance : null,
          event: data.event || null,
          recap: body,
        };
      }),
  );

  return items
    .filter((h): h is Highlight => h !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
