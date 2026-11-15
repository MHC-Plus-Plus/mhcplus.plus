import { cn } from "@/lib/utils";

/**
 * Width-capped, horizontally-centered wrapper. Max width (1360px) and the
 * fluid side padding come from the --container / --gutter tokens.
 */
type Props = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ className, children }: Props) {
  return <div className={cn("container-page", className)}>{children}</div>;
}
