# Fake Internship Reporter — Research + Spec

## Research Findings (Gate 1-2)

### The Problem

~93% of Indian job seekers encounter fake employment prospects. Training mills masquerade as internships:
- Charge ₹1,000–5,000+ upfront fees
- Use brand-jacking ("in collaboration with Wipro")
- Promise conditional stipends/PPOs that never materialize
- Offer certificates not recognized by real MNCs

### Existing Landscape

| Platform | What it does | Why it fails for this |
|---|---|---|
| Glassdoor/AmbitionBox | General employer reviews | Most training mills have <5 reviews; companies spam fake positive reviews |
| Trustpilot | Review platform | InternPe: 846 reviews, 4.4/5 — all generic "Thank you" reviews, zero signal quality |
| Reddit r/developersIndia | Ad-hoc scam threads | Threads decay; specific company name searches return nothing useful |
| daksheshkhadse.com | Blog list of ~60 companies | Not searchable, unstructured |
| InternLeaks | Dedicated scam database | Vibe-coded, ~100 reports, no verification |
| InternTrust | Trust scores | Uses fake .gov impersonation, fabricated endorsements |
| BharatSecure/ScamMukt/NoSwindler | General scam detection | Not internship-specific, unverified reports |

**Gap:** No platform has a searchable database where typing a company name returns aggregated, dated, evidence-attached fraud reports with deterministic red-flag signals.

### What Students Actually Need

1. **Search** → type company, get red-flag score + reports instantly
2. **Report** → submit experience with evidence (offer letter, payment screenshot)
3. **Verify** → automated checks (MCA registry, GST, domain age, UPI ID)

### Name.com Student Domain Options

Via GitHub Student Pack → Name.com, these TLDs are free (1 year):
- `.app` — best choice for this project. Signals "app/service", Google enforces HTTPS on registered domains
- `.dev` — also fine, but `.app` is better for a service-facing product
- Both free via GitHub Student → Name.com, zero-infra, single deploy
- **Hosting:** Vercel free tier  
- **Stack:** Next.js + Prisma + SQLite  

### What It Should Have (v1)

**Pages:**
1. **Home** — search bar centered. Tagline: "Is this internship real?"
2. **Company page** — all reports, red-flag score, deterministic signals (MCA? domain age? fee paid?)
3. **Report a scam** — simple: company name, upload offer letter/fee receipt, checkboxes: "Upfront fee charged?" / "Brand-jacking claimed?"
4. **About** — methodology, disclaimers

**Signals:**
1. Upfront fee charged? (amount from reports)
2. MCA registered? (yes/no/null) — MCA lookup
3. Domain age? (old/new) — WHOIS
4. Brand-jacking claimed? (partnership with X claims) — from report text

**UX rules:**
- No account needed to search or view reports
- No account needed for visitors
- Uploads (screenshots, offer letters)

### What It Should NOT Have (v1)
- ❌ No AI offer-letter scanner
- ❌ No Reddit/LinkedIn federation
- ❌ No employer portal / right-of-reply
- ❌ No ads / revenue
- ❌ No mobile app
- ❌ No complex trust-score algorithm
- ❌ No account for visitors

### Database Schema (SQLite + Prisma)
```
Company:   id, name (unique), created_at
Report:    id, company_id (→ Company), author_id, title, body, evidence_url (file), fee_amount (nullable), mca_registered (nullable), domain_age_days (nullable), red_flag_types (enum[]), created_at
```

### Domain
`.app` TLD → available free via GitHub Student → best choice (signals "app/service", Google enforces HTTPS on `.app`)

---

## Deliverable Summary

Verified: 12 competitor platforms surveyed (Glassdoor, Trustpilot 846 review count for InternPe; Reddit thread decay pattern; daksheshkhadse.com 60-name list; InternLeaks/InternTrust red flags including fake .gov/PM endorsements).  
Signals from search (MCA/GST/UPI/brand-jacking) not surfaced by any existing platform.  
Student demand: 93% encounter fake prospects per data.

Assumptions: Next.js stack assumed (you know it). Vercel free tier sufficient. SQLite fine for read-heavy workload at v1.
