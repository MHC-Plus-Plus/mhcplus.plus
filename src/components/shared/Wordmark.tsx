import { Logo } from "./Logo";

/**
 * Logo + "MHC++" wordmark. The "++" picks up --primary-bright so the brand
 * accent is consistent across nav, footer, and elsewhere.
 */
type Props = {
  size?: number;
  className?: string;
};

export function Wordmark({ size = 28, className }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      {/* Soft brand glow behind the logo, matching the mockup nav. */}
      <span className="relative inline-flex">
        <Logo size={size} />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-0.5 -z-10 bg-primary opacity-35 blur-md"
        />
      </span>
      <span className="text-[17px] font-bold tracking-[-0.01em]">
        MHC<span className="text-primary-bright">++</span>
      </span>
    </span>
  );
}
