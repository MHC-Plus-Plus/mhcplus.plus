"use client";

import { useActionState } from "react";
import { submitFeedback, type FeedbackState } from "@/app/feedback/actions";
import { RatingInput } from "@/components/feedback/RatingInput";
import { ENJOYED_OPTIONS } from "@/lib/feedback";

type Props = {
  eventId: string;
  /** Inferred event type, e.g. "workshop". */
  type: string;
  hasSpeaker: boolean;
};

const panel = "rounded-md border border-border bg-bg-card/60 p-6 backdrop-blur-sm";
const labelClass = "mb-3 block text-base font-semibold";
const inputClass =
  "w-full rounded-sm border border-border-strong bg-bg-elevated px-3 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-primary focus:outline-none";

export function FeedbackForm({ eventId, type, hasSpeaker }: Props) {
  const [state, action, pending] = useActionState<FeedbackState, FormData>(
    submitFeedback.bind(null, eventId),
    { status: "idle" },
  );

  if (state.status === "success") {
    return (
      <div className={panel} role="status">
        <h2 className="text-2xl font-bold tracking-[-0.02em]">Thanks for the feedback.</h2>
        <p className="mt-3 text-fg-muted">
          It helps us make the next one better. See you at a future event.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className={`${panel} grid gap-5 sm:grid-cols-2`}>
        <label>
          <span className={labelClass}>
            First name <span className="font-normal text-fg-subtle">(optional)</span>
          </span>
          <input name="firstName" autoComplete="given-name" maxLength={100} className={inputClass} />
        </label>
        <label>
          <span className={labelClass}>
            Last name <span className="font-normal text-fg-subtle">(optional)</span>
          </span>
          <input name="lastName" autoComplete="family-name" maxLength={100} className={inputClass} />
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>
            Frequently checked email <span className="font-normal text-fg-subtle">(optional)</span>
          </span>
          <input name="email" type="email" autoComplete="email" maxLength={200} className={inputClass} />
        </label>
      </div>

      <RatingInput name="overall" label={`How would you rate the ${type} overall?`} />
      <RatingInput name="access" label={`Was the ${type} easy to access and join?`} />
      <RatingInput name="relevance" label="Was the content relevant to your interests or needs?" />
      {hasSpeaker && (
        <RatingInput name="speaker" label="How would you rate the speaker's delivery and clarity?" />
      )}

      <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']">
        Improvement section
      </p>

      <fieldset className={panel}>
        <legend className="sr-only">What did you most enjoy about the event?</legend>
        <p className={labelClass} aria-hidden>
          What did you most enjoy about the event?{" "}
          <span className="font-normal text-fg-subtle">(Check all that apply)</span>
        </p>
        <div className="flex flex-col gap-3">
          {ENJOYED_OPTIONS.filter((o) => hasSpeaker || !("speakerOnly" in o)).map((o) => (
            <label key={o.value} className="flex items-center gap-3 text-sm text-fg-muted">
              <input type="checkbox" name="enjoyed" value={o.value} className="size-4 accent-primary" />
              {o.label}
            </label>
          ))}
          <label className="flex items-center gap-3 text-sm text-fg-muted">
            <span>Other:</span>
            <input name="enjoyedOther" maxLength={300} className={inputClass} />
          </label>
        </div>
      </fieldset>

      <label className={panel}>
        <span className={labelClass}>What could be improved in future {type}s?</span>
        <input name="improve" maxLength={2000} className={inputClass} />
      </label>

      <label className={panel}>
        <span className={labelClass}>What topics would you like us to cover in upcoming {type}s?</span>
        <input name="topics" maxLength={2000} className={inputClass} />
      </label>

      <RatingInput name="recommend" icon="thumb" label={`Would you recommend this ${type} to others?`} />

      <label className={panel}>
        <span className={labelClass}>Any other comments?</span>
        <textarea name="comments" rows={4} maxLength={2000} className={inputClass} />
      </label>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-sm border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary-bright">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 self-start rounded-sm border border-primary bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-bright disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit feedback"}
      </button>
    </form>
  );
}
