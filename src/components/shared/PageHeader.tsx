import { Container } from "@/components/shared/Container";

/**
 * Sub-page intro: mono label on the left, giant title on the right, then the
 * intro as a two-tone statement (`lead` in primary text, `rest` muted) and
 * optional actions. Label column stacks above the content on mobile.
 */
type Props = {
  label: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  rest?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHeader({ label, title, lead, rest, children }: Props) {
  return (
    <section>
      <Container className="py-section">
        <div className="intro-grid">
          <p className="label pt-3">{label}</p>
          <div className="min-w-0">
            <h1 className="h-page break-words">{title}</h1>
            {lead && (
              <p className="statement mt-[clamp(32px,4vw,56px)]">
                {lead}
                {rest && <span className="muted"> {rest}</span>}
              </p>
            )}
            {children && <div className="mt-[clamp(32px,4vw,48px)]">{children}</div>}
          </div>
        </div>
      </Container>
    </section>
  );
}
