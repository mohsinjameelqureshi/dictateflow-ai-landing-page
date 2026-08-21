import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The product's own mark, from `public/logo-84.webp` (derived from the
 * 1024px master at `public/logo.png`, sized for 3x DPR at 28 CSS px).
 *
 * It is served unoptimised because the site is a static export, so width and
 * height are given explicitly to reserve the box and keep CLS at zero.
 */
export function Logo({
  className,
  size = 28,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-84.webp"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      priority={priority}
      className={cn("shrink-0 select-none object-contain", className)}
    />
  );
}
