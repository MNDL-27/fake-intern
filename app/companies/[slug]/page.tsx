import Link from "next/link";
import { findCompanyBySlug, findReportsByCompanyId } from "@/lib/db";

export const runtime = "edge";

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await findCompanyBySlug(slug);
  if (!company) return <NotFound />;

  const reports = await findReportsByCompanyId(company.id);

  const feeCount = reports.filter((r) => r.fee_charged).length;
  const jackCount = reports.filter((r) => r.brand_jacking).length;

  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 pb-20">
      <Link href="/" className="text-[12.5px] font-medium text-ink3 hover:text-ink mb-3 inline-block">&larr; Search</Link>
      <h1 className="text-[1.85rem] font-extrabold tracking-tight text-ink mb-1">{company.name}</h1>
      <p className="text-[12.5px] text-ink3 mb-8">{reports.length} report{reports.length === 1 ? "" : "s"}</p>

      <div className="flex flex-wrap gap-2 mb-10">
        {feeCount > 0 && (
          <span className="text-[11.5px] font-extrabold uppercase tracking-wide px-3 py-1.5 rounded-md bg-[#c76b2a]/10 text-[#8c3c10]">Fees × {feeCount}</span>
        )}
        {jackCount > 0 && (
          <span className="text-[11.5px] font-extrabold uppercase tracking-wide px-3 py-1.5 rounded-md bg-[#c76b2a]/10 text-[#8c3c10]">Brand-jacking × {jackCount}</span>
        )}
        {feeCount === 0 && jackCount === 0 && reports.length > 0 && (
          <span className="text-[11.5px] font-extrabold uppercase tracking-wide px-3 py-1.5 rounded-md bg-ok/10 text-ok">No fee/brand-jack flags</span>
        )}
      </div>

      <div className="flex gap-4 mb-10">
        <div className="flex-1 rounded-xl bg-white border border-ink5 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <h3 className="text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-2">Upfront fee</h3>
          <p className="text-[1.75rem] font-extrabold tracking-tight text-ink mb-1">{feeCount > 0 ? "Yes" : "No"}</p>
          <p className="text-[12px] text-ink3">{feeCount} report{feeCount === 1 ? "" : "s"} mentioned fees</p>
        </div>
        <div className="flex-1 rounded-xl bg-white border border-ink5 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <h3 className="text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-2">Brand-jacking</h3>
          <p className="text-[1.75rem] font-extrabold tracking-tight text-ink mb-1">{jackCount > 0 ? "Yes" : "No"}</p>
          <p className="text-[12px] text-ink3">{jackCount} report{jackCount === 1 ? "" : "s"} mentioned false partnerships</p>
        </div>
      </div>

      <h2 className="text-[1.05rem] font-extrabold tracking-tight text-ink mb-4">Reports</h2>
      {reports.length === 0 ? (
        <p className="text-ink3">No reports yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reports.map((r) => (
            <article key={r.id} className="rounded-xl border border-ink5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <h3 className="text-[1.05rem] font-extrabold tracking-tight text-ink mb-2">{r.title}</h3>
              <p className="text-[13.5px] text-ink2 leading-[1.6] whitespace-pre-line mb-4">{r.body}</p>
              <div className="flex flex-wrap items-center gap-2 text-[11.5px] font-medium text-ink3">
                <span>By {r.author}</span>
                <span>·</span>
                <span>{new Date(r.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                {r.fee_charged && <><span>·</span><span className="text-redflag font-extrabold">Fees charged</span></>}
                {r.brand_jacking && <><span>·</span><span className="text-redflag font-extrabold">Brand-jacking</span></>}
              </div>
            </article>
          ))}
        </div>
      )}

      <Link href="/report" className="inline-block mt-8 px-6 py-3 rounded-xl bg-ink text-paper text-[13.5px] font-bold hover:bg-ink2">Report this company</Link>
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-16 pb-20 text-center">
      <h1 className="text-[1.5rem] font-extrabold tracking-tight text-ink mb-2">Not found</h1>
      <p className="text-ink2">No company with that slug.</p>
    </div>
  );
}