"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function ReportPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setSlug(slugify(companyName));
  }, [companyName]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      companyName,
      slug,
      author: formData.get("author") as string || "Anonymous",
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      feeCharged: formData.get("feeCharged") === "on",
      brandJacking: formData.get("brandJacking") === "on",
      feeAmount: formData.get("feeAmount") ? Number(formData.get("feeAmount")) : null,
      website: formData.get("website") as string || null,
      mcaRegistered: formData.get("mcaRegistered") === "yes" ? true : formData.get("mcaRegistered") === "no" ? false : null,
      domainAgeDays: formData.get("domainAge") ? Number(formData.get("domainAge")) : null,
    };

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit");
      }
      const data = await res.json();
      router.push(`/companies/${data.slug}?new=1`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 pt-12 pb-20">
      <Link href="/" className="text-[12.5px] font-medium text-ink3 hover:text-ink transition-colors mb-2 inline-block">&larr; Search</Link>
      <h1 className="text-[1.75rem] font-extrabold tracking-tight text-ink mb-1">File a report</h1>
      <p className="text-[13.5px] text-ink3 mb-10">Tell other students what to watch out for. No account needed.</p>

      {error && (
        <div className="mb-5 rounded-lg border border-redflag/20 bg-redflag/5 p-4 text-[13px] text-[#8c3c10]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="block text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-2">Company name</label>
          <input
            id="name"
            name="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. InspireLeap"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-2">Slug (auto-filled)</label>
          <input
            id="slug"
            name="slug"
            type="text"
            value={slug}
            className="text-ink3 bg-ink5/30 cursor-not-allowed"
            readOnly
            disabled
          />
          <p className="text-[11px] text-ink4 mt-1">Used for the company page URL.</p>
        </div>

        <div>
          <label htmlFor="author" className="block text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-2">Your first name (optional)</label>
          <input id="author" name="author" type="text" placeholder="Anonymous is fine" />
        </div>

        <div>
          <label htmlFor="title" className="block text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-2">Report title</label>
          <input id="title" name="title" type="text" placeholder="e.g. Charged ₹5,000 for a 2-week course" required />
        </div>

        <div>
          <label htmlFor="body" className="block text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-2">What happened?</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            placeholder="Describe the experience: fees, promises, what was delivered..."
            required
          />
        </div>

        <div>
          <label htmlFor="feeAmount" className="block text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-2">Fee amount (if any)</label>
          <input id="feeAmount" name="feeAmount" type="number" placeholder="e.g. 5000" min="0" />
        </div>

        <div>
          <label htmlFor="website" className="block text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-2">Company website (if known)</label>
          <input id="website" name="website" type="url" placeholder="e.g. https://example.com" />
        </div>

        <div className="flex flex-wrap gap-4 text-[13px]">
          <label className="flex items-center gap-2 text-ink2 cursor-pointer">
            <input name="feeCharged" type="checkbox" className="w-4 h-4 rounded border-ink5 text-ink accent-ink" />
            <span className="font-medium">Upfront fee charged</span>
          </label>
          <label className="flex items-center gap-2 text-ink2 cursor-pointer">
            <input name="brandJacking" type="checkbox" className="w-4 h-4 rounded border-ink5 text-ink accent-ink" />
            <span className="font-medium">Brand-jacking (e.g. "Wipro partnership")</span>
          </label>
        </div>

        <div className="rounded-xl border border-ink5/60 bg-ink5/30 p-5">
          <h3 className="text-[11.5px] font-extrabold uppercase tracking-widest text-ink3 mb-3">Verification signals</h3>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-[12.5px] font-medium text-ink2 mb-1.5">MCA registered?</label>
              <select name="mcaRegistered" className="text-[13px]">
                <option value="">Not checked</option>
                <option value="yes">Yes — registered</option>
                <option value="no">No — not found in MCA</option>
              </select>
              <p className="text-[11px] text-ink4 mt-1">Check at <a href="https://www.mca.gov.in/mcafoportal/checkcompanyname.do" target="_blank" rel="noreferrer" className="underline decoration-ink4 hover:decoration-ink">mca.gov.in</a></p>
            </div>
            <div>
              <label htmlFor="domainAge" className="block text-[12.5px] font-medium text-ink2 mb-1.5">Domain age (days)</label>
              <input id="domainAge" name="domainAge" type="number" placeholder="e.g. 30 (if domain is 1 month old)" min="0" />
              <p className="text-[11px] text-ink4 mt-1">Check at <a href="https://whois.domaintools.com/" target="_blank" rel="noreferrer" className="underline decoration-ink4 hover:decoration-ink">whois.domaintools.com</a></p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3.5 rounded-xl bg-ink text-paper text-[14.5px] font-extrabold hover:bg-ink2 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit report"}
        </button>

        <p className="text-[11.5px] text-ink4">
          By submitting, you confirm this is your honest experience. False reports harm real students.
        </p>
      </form>
    </div>
  );
}
