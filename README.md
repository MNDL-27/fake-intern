# Fake Internship Reporter

**Fake Internship Reporter** is an open-source platform built to expose training mills and fake internship rackets that scam Indian job seekers. Built for deployment on Cloudflare Pages/Workers using Next.js and Cloudflare D1.

## The Problem
Approximately 93% of Indian job seekers encounter fake employment prospects. Training mills masquerade as legitimate companies or MNC brand partners, charging upfront "training" or "certification" fees (ranging from ₹1,000 to ₹5,000+) while promising stipends or jobs that never materialize.

## Key Features
1. **Scam Search**: Instantly look up a company to see its trust signals and aggregated scanner score.
2. **Scam Reporting**: Submit internship fraud reports with metadata (upfront fees, brand jacking, etc.) and evidence.
3. **Automated Verification**: Runs checks on company registrations, WHOIS domain ages, and known fraudulent UPI IDs.

## Tech Stack
* **Framework**: Next.js 15 (Edge Runtime)
* **Database**: Cloudflare D1 (SQLite)
* **Deployment**: Cloudflare Pages / Workers
* **Tooling**: `@cloudflare/next-on-pages`

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Initialize Local Database**:
   ```bash
   npx wrangler d1 execute fake-intern-db --local --file=./migrations/0001_init.sql
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## Contributing
This codebase is public. Contributions are welcome to improve the search, verification checks, and UI/UX. Please open an issue or submit a pull request!
