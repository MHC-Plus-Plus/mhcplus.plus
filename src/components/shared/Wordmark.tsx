/**
 * "MHC++" text wordmark: "MHC" in the primary text color, "++" in the
 * accent. The `size` prop is the font size in px.
 */
type Props = {
  size?: number;
  className?: string;
};

export function Wordmark({ size = 20, className }: Props) {
  return (
    <span
      className={`inline-flex items-baseline font-heading font-extrabold leading-none tracking-[-0.045em] text-fg ${className ?? ""}`}
      style={{ fontSize: `${size}px` }}
    >
      MHC<span className="text-accent">++</span>
    </span>
  );
}
