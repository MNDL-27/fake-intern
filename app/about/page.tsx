import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 pb-20">
      <Link href="/" className="text-[12.5px] font-medium text-ink3 hover:text-ink transition-colors mb-2 inline-block">&larr; Search</Link>
      <h1 className="text-[1.75rem] font-extrabold tracking-tight text-ink mb-6">About</h1>

      <div className="flex flex-col gap-6 text-[14.5px] text-ink2 leading-[1.65]">
        <p>
          <strong className="text-ink">Fake Internship Reporter</strong> is a public database of student-submitted reports about suspicious training programs that masquerade as internships.
        </p>

        <div>
          <h2 className="text-[1.05rem] font-extrabold text-ink mb-2">What we track</h2>
          <ul className="list-disc list-inside flex flex-col gap-1 text-[13.5px]">
            <li>Upfront fees charged to students (₹1,000–5,000+)</li>
            <li>Brand-jacking: false claims of partnership with Wipro, Infosys, AICTE, etc.</li>
            <li>Conditional stipends/PPOs that never materialize</li>
            <li>Certificates not recognized by real MNCs</li>
          </ul>
        </div>

        <div>
          <h2 className="text-[1.05rem] font-extrabold text-ink mb-2">Methodology</h2>
          <p>Reports are user-submitted and unattributed to any individual. Every report shows the date and the claimed red flags. We do not verify reports before publishing. We surface MCA registration status and domain age when checked — but these are signals, not guarantees.</p>
        </div>

        <div>
          <h2 className="text-[1.05rem] font-extrabold text-ink mb-2">Disclaimers</h2>
          <ul className="list-disc list-inside flex flex-col gap-1 text-[13.5px]">
            <li>This is a student-run project. Not affiliated with any government body or official body.</li>
            <li>Report data is unaudited. A report does not equal a verdict.</li>
            <li>Check MCA.gov.in and Google yourself before making decisions.</li>
            <li>This tool is for information purposes only.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-[1.05rem] font-extrabold text-ink mb-2">How to verify yourself</h2>
          <ol className="list-decimal list-inside flex flex-col gap-1 text-[13.5px]">
            <li>Check company on MCA.gov.in — real companies have 21-digit CIN.</li>
            <li>Check domain age at whois.domaintools.com — scammers register week-old domains.</li>
            <li>Search <code className="font-mono text-[11.5px] bg-ink5/40 px-1.5 py-0.5 rounded">"[company name] scam"</code> on Reddit and LinkedIn.</li>
            <li>If they ask for money before you work, that's a red flag. Full stop.</li>
          </ol>
        </div>

        <div className="text-[12.5px] text-ink4 pt-4 border-t border-ink5">
          Made by a student tired of fake internships. v1 — July 2026.
        </div>
      </div>
    </div>
  );
}