import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "HackMHC++ - MHC++",
  description: "HackMHC++, the inter-CUNY hackathon run by MHC++.",
};

export default async function HackathonPage() {
  const page = await getPage("hackathon");
  const meta = page?.meta ?? {};
  const past = meta.status === "past";

  return (
    <>
      <PageHeader
        label="Hackathon"
        title={
          <>
            HackMHC<span className="text-accent">++</span>
          </>
        }
        lead="The inter-CUNY hackathon."
        rest="Build something with students from every campus."
      >
        <dl className="flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-6">
          {[
            ["Date", meta.date ?? "TBA"],
            ["Location", meta.location ?? "TBA"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="meta">{k}</dt>
              <dd className="mt-2 text-base text-fg">{v}</dd>
            </div>
          ))}
        </dl>

        {!past && (
          <span aria-disabled="true" className="btn btn-outline btn-lg mt-10 text-fg-2">
            Registration opens in the spring
          </span>
        )}
      </PageHeader>

      {page && (
        <section className="border-t border-line">
          <Container className="py-section">
            <div className="intro-grid">
              <p className="label pt-1">About</p>
              <div className="[&_p]:text-lg">
                <MarkdownContent>{page.body}</MarkdownContent>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
