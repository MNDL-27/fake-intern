export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 pt-16 pb-24">
      <section className="max-w-xl mx-auto text-center">
        <h1 className="text-[2.8rem] sm:text-[3.2rem] leading-[1.05] tracking-[-0.035em] font-extrabold text-ink mb-5">
          Fake Internship Reporter
        </h1>
        <p className="text-[17px] sm:text-[18.5px] leading-[1.55] text-ink2 mb-4">
          Before you apply to an internship, see what other students have reported. No sign-up needed to search.
        </p>
        <p className="text-[13.5px] text-ink3 mb-12 font-medium">
          Search any company. Read reports. Check red flags.
        </p>

        <form
          method="GET"
          action="/search"
          className="flex items-stretch gap-2 max-w-lg mx-auto"
          aria-label="Search company"
        >
          <label htmlFor="q" className="sr-only">Company name</label>
          <input
            id="q"
            name="q"
            type="text"
            placeholder="Enter a company name..."
            className="flex-1 min-w-0 rounded-xl bg-white border border-ink5 text-ink px-5 py-3.5 text-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] focus:outline-none focus:border-ink transition-colors placeholder:text-ink4"
            required
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-ink text-paper text-[14.5px] font-bold tracking-tight hover:bg-ink2 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.06)] shrink-0"
          >
            Search
          </button>
        </form>

        <div className="mt-6 text-[12.5px] text-ink4 font-normal">
          Try: InspireLeap, CodSoft, Hex Software, anorg technologies, techmaa
        </div>
      </section>

      <section className="max-w-xl mx-auto mt-24 text-center" aria-label="Why this exists">
        <h2 className="text-[1.05rem] font-extrabold tracking-tight text-ink mb-6">Why this exists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-[13.5px] text-ink2 leading-[1.55]">
          <div className="rounded-xl border border-ink5/60 bg-white/60 px-5 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <span className="block font-extrabold text-[11.5px] uppercase tracking-widest text-redflag mb-2">Fees</span>
            Some training mills charge ₹1,000–5,000+ to join. We surface reports of paid fees.
          </div>
          <div className="rounded-xl border border-ink5/60 bg-white/60 px-5 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <span className="block font-extrabold text-[11.5px] uppercase tracking-widest text-redflag mb-2">Brand-jacking</span>
            Some companies claim "in collaboration with Wipro / Infosys." Reports show if it's verified.
          </div>
          <div className="rounded-xl border border-ink5/60 bg-white/60 px-5 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <span className="block font-extrabold text-[11.5px] uppercase tracking-widest text-redflag mb-2">No sign-up</span>
            No account needed to search or read reports. Just type a name.
          </div>
        </div>
      </section>
    </div>
  );
}