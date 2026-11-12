import { parseDelimited } from "@/lib/csv";
import { validateOpportunity, type OpportunityInput } from "@/lib/opportunity-validate";

export const MAX_IMPORT_ROWS = 100;
export const MAX_IMPORT_CHARS = 200_000;

export const CSV_EXAMPLE = `title,org,url,category,deadline,description
Software Engineering Intern,Example Corp,https://example.com/apply,Internship,2026-12-01,"Summer role, open to sophomores and up."
CUNY Tech Prep,CUNY,https://example.com/ctp,CUNY program,,Rolling admission`;

const HEADER_ALIASES: Record<string, string> = {
  organization: "org",
  company: "org",
  link: "url",
  "due date": "deadline",
  due: "deadline",
};

const ROLLING = new Set(["", "rolling", "n/a", "na", "none", "-"]);
const FALSE_VALUES = new Set(["no", "false", "0", "hidden", "draft"]);

export type CsvParseResult = { rows: OpportunityInput[]; errors: string[] };

/**
 * Parses pasted CSV or spreadsheet (tab-separated) text. Needs a header row with
 * title, org, url, category; deadline, description and published are optional.
 * All-or-nothing: callers should refuse to import when `errors` is non-empty.
 */
export function parseOpportunityCsv(input: string): CsvParseResult {
  const text = input.replace(/^﻿/, "").trim();
  if (!text) return { rows: [], errors: [] };
  if (text.length > MAX_IMPORT_CHARS) return { rows: [], errors: ["That's too much text to import at once."] };

  const firstLine = text.split(/\r?\n/, 1)[0];
  const table = parseDelimited(text, firstLine.includes("\t") ? "\t" : ",");
  const header = table[0].map((h) => {
    const key = h.trim().toLowerCase();
    return HEADER_ALIASES[key] ?? key;
  });

  const missing = ["title", "org", "url", "category"].filter((c) => !header.includes(c));
  if (missing.length) {
    return { rows: [], errors: [`Header row is missing: ${missing.join(", ")}.`] };
  }
  const body = table.slice(1);
  if (body.length > MAX_IMPORT_ROWS) {
    return { rows: [], errors: [`Import up to ${MAX_IMPORT_ROWS} rows at a time (found ${body.length}).`] };
  }

  const col = (cells: string[], name: string) => {
    const i = header.indexOf(name);
    return i === -1 ? "" : (cells[i] ?? "").trim();
  };

  const rows: OpportunityInput[] = [];
  const errors: string[] = [];
  body.forEach((cells, i) => {
    const deadline = col(cells, "deadline");
    const result = validateOpportunity({
      title: col(cells, "title"),
      org: col(cells, "org"),
      url: col(cells, "url"),
      description: col(cells, "description"),
      category: col(cells, "category"),
      deadline: ROLLING.has(deadline.toLowerCase()) ? "" : deadline,
      published: !FALSE_VALUES.has(col(cells, "published").toLowerCase()),
    });
    if ("error" in result) errors.push(`Row ${i + 2}: ${result.error}`);
    else rows.push(result.values);
  });
  return { rows, errors };
}
