"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label: string;
  icon?: "star" | "thumb";
};

/** 1–5 rating built on native radios, so it works with FormData and the keyboard. */
export function RatingInput({ name, label, icon = "star" }: Props) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const Icon = icon === "star" ? Star : ThumbsUp;
  const shown = hover || value;

  return (
    <fieldset className="card p-6">
      <legend className="sr-only">{label}</legend>
      <p className="mb-5 text-base font-medium" aria-hidden>
        {label} <span className="text-accent">*</span>
      </p>
      <div className="flex max-w-sm justify-between" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className="flex cursor-pointer flex-col items-center gap-2"
            onMouseEnter={() => setHover(n)}
          >
            <span className="font-mono text-xs text-fg-2">{n}</span>
            <input
              type="radio"
              name={name}
              value={n}
              required
              checked={value === n}
              onChange={() => setValue(n)}
              className="peer sr-only"
            />
            <Icon
              aria-hidden
              className={cn(
                "size-8 rounded-sm text-fg-2 transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent peer-focus-visible:outline-solid",
                n <= shown && "fill-fg text-fg",
              )}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
