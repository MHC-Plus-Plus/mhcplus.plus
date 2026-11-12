"use client";

import { useState, useTransition } from "react";
import { setEventType } from "@/app/admin/(protected)/covers/actions";
import { EVENT_TYPES } from "@/lib/event-types";

type Props = { eventId: string; override: string | null };

export function EventTypeSelect({ eventId, override }: Props) {
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-subtle" htmlFor={`type-${eventId}`}>
        Event type
      </label>
      <select
        id={`type-${eventId}`}
        defaultValue={override ?? ""}
        disabled={pending}
        onChange={(e) =>
          startTransition(async () => {
            const res = await setEventType(eventId, e.target.value || null);
            setMessage(res.ok ? "Saved." : "Couldn't save.");
          })
        }
        className="rounded-sm border border-border-strong bg-bg-elevated px-3 py-2 text-sm text-fg outline-none focus:border-primary"
      >
        <option value="">Auto (CampusGroups)</option>
        {EVENT_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>
      {message && <span role="status" className="text-fg-subtle">{message}</span>}
    </div>
  );
}
