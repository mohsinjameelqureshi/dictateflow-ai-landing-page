import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";

/**
 * A full-width band with a centred header and a free content track beneath.
 *
 * This replaces the old 168px documentation rail. The rail put every heading
 * in a margin and forced each section into the same narrow right-hand column;
 * banding the page lets the content below the header use the full 1200px and
 * take whatever shape it actually needs — a bento, a ledger, a diagram.
 *
 * Block rhythm comes from the single `.section` rule in globals.css. A
 * section that needs more air sets `air`; padding is never redeclared.
 */
export function Section({
  id,
  eyebrow,
  heading,
  lead,
  children,
  air = false,
  seam = true,
  className,
  headerClassName,
}: {
  id?: string;
  eyebrow: string;
  heading: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
  air?: boolean;
  /** The fading hairline that separates this band from the one above. */
  seam?: boolean;
  className?: string;
  headerClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={cn("section", air && "section-air", seam && "seam", className)}
    >
      <div className="container-page">
        <Reveal
          as="header"
          className={cn(
            "flex flex-col items-center text-center",
            headerClassName,
          )}
        >
          <Eyebrow>{eyebrow}</Eyebrow>

          <h2
            id={id ? `${id}-heading` : undefined}
            className="mt-5 max-w-[20ch] text-balance font-display text-display-section text-fg"
          >
            {heading}
          </h2>

          {lead ? (
            <p className="measure-lead mt-5 text-pretty text-lead text-fg-muted">
              {lead}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
