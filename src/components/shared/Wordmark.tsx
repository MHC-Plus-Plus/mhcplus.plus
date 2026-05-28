/**
 * "MHC++" text wordmark. No logo icon, all white. Used in the nav and
 * footer. The `size` prop maps to the text size in px so callers can pick
 * larger/smaller without thinking in Tailwind units.
 */
type Props = {
  size?: number;
  className?: string;
};

export function Wordmark({ size = 17, className }: Props) {
  return (
    <span
      className={`inline-flex items-center font-bold tracking-[-0.01em] text-fg ${className ?? ""}`}
      style={{ fontSize: `${size}px` }}
    >
      MHC++
    </span>
  );
}
