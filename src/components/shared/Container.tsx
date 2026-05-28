import { cn } from "@/lib/utils";

/**
 * Width-capped, horizontally-centered wrapper. Width comes from the
 * --container token (1180px); horizontal padding matches the mockup.
 */
type Props = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ className, children }: Props) {
  return (
    <div
      className={cn("relative z-[1] mx-auto w-full px-6", className)}
      style={{ maxWidth: "var(--container)" }}
    >
      {children}
    </div>
  );
}
