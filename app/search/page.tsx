import Link from "next/link";
import { findCompanyBySlug, findReportsByCompanyId } from "@/lib/db";

export const runtime = "edge";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const trimmed = q.trim();

  if (!trimmed) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-ink2">Enter a company name to search</p>
      </div>
    );
  }

  const slug = slugify(trimmed);
  let company = null;
  let reports: any[] = [];
  try {
    company = await findCompanyBySlug(slug);
    if (company) reports = await findReportsByCompanyId(company.id);
  } catch {
    // D1 not available in dev — show stub
  }

  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 pb-20">
      <div className="text-[12.5px] uppercase tracking-widest text-ink4 mb-2 font-bold">Search</div>
      <h1 className="text-[1.75rem] font-extrabold tracking-tight text-ink mb-8 leading-tight">
        Results for &ldquo;{trimmed}&rdquo;
      </h1>

      {company ? (
        <CompanyResult company={{ ...company, reports }} />
      ) : (
        <NoResults q={trimmed} slug={slug} />
      )}
    </div>
  );
}

function CompanyResult({
  company,
}: {
  company: {
    slug: string;
    name: string;
    reports: Array<{ id: string; title: string; fee_charged: boolean; brand_jacking: boolean; created_at: string; author: string }>;
  };
}) {
  const feeCount = company.reports.filter((r) => r.fee_charged).length;
  const jackCount = company.reports.filter((r) => r.brand_jacking).length;
  const flags = feeCount + jackCount;

  return (
    <Link
      href={`/companies/${company.slug}`}
      className="block rounded-xl border border-ink5 bg-white p-6 hover:border-ink2 transition-colors cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-[1.15rem] font-extrabold tracking-tight text-ink mb-1">{company.name}</h2>
          <div className="text-[12.5px] text-ink3 mb-3">
            {company.reports.length} report{company.reports.length === 1 ? "" : "s"}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {feeCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[11.5px] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-[#c76b2a]/10 text-[#8c3c10]">
                Fees reported ×{feeCount}
              </span>
            )}
            {jackCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[11.5px] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-[#c76b2a]/10 text-[#8c3c10]">
                Brand-jacking ×{jackCount}
              </span>
            )}
            {flags === 0 && company.reports.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[11.5px] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-ok/10 text-ok">
                No fee/brand-jack flags
              </span>
            )}
          </div>
        </div>
        <span className="text-ink3 text-[18px] leading-none mt-1">&rarr;</span>
      </div>
    </Link>
  );
}

function NoResults({ q, slug }: { q: string; slug: string }) {
  return (
    <div className="rounded-xl border border-dashed border-ink5 bg-paper px-6 py-8 text-center">
      <p className="text-ink2 text-[15px] mb-2">
        No reports for <span className="font-bold text-ink">{q}</span> yet.
      </p>
      <p className="text-ink3 text-[13.5px] mb-5">
        Be the first to file a report — it helps the next student.
      </p>
      <Link
        href={`/report?company=${encodeURIComponent(q)}&slug=${encodeURIComponent(slug)}`}
        className="inline-block px-5 py-2.5 rounded-xl bg-ink text-paper text-[13.5px] font-bold hover:bg-ink2 transition-colors"
      >
        File a report
      </Link>
    </div>
  );
}