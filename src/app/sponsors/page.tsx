import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { EMAIL, SPONSOR_PACKET_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Sponsors · MHC++",
  description: "Partner with MHC++ to reach CS students across CUNY.",
};

export default function SponsorsPage() {
  return (
    <PageHeader
      label="Sponsors"
      title="Partner with us."
      lead="MHC++ connects companies and organizations with computer science students from every CUNY campus,"
      rest="through events, workshops, and HackMHC++."
    >
      <div className="flex flex-wrap gap-3">
        <a
          href={SPONSOR_PACKET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent btn-lg"
        >
          Download the sponsor packet →
        </a>
        <a href={`mailto:${EMAIL}`} className="btn btn-outline btn-lg">
          Contact us
        </a>
      </div>
    </PageHeader>
  );
}
