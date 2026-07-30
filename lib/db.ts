// ponytail: D1 client — uses Cloudflare D1 binding directly.
// In dev, falls back to local SQLite via wrangler.

// Stub for Cloudflare D1Database so tsc doesn't fail in plain Node
declare global {
  // eslint-disable-next-line no-unused-vars
  interface D1Database {
    prepare(query: string): D1PreparedStatement;
    // eslint-disable-next-line no-unused-vars
    [key: string]: unknown;
  }
  // eslint-disable-next-line no-unused-vars
  interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    first<T>(): Promise<T | null>;
    all<T>(): Promise<{ results: T[] }>;
    run(): Promise<{ success: boolean; meta?: unknown; error?: string }>;
    raw<T>(): Promise<T[]>;
    // eslint-disable-next-line no-unused-vars
    [key: string]: unknown;
  }
}

interface Company {
  id: string;
  slug: string;
  name: string;
  domain_age_days: number | null;
  mca_registered: boolean | null;
  created_at: string;
}

interface Report {
  id: string;
  company_id: string;
  author: string;
  title: string;
  body: string;
  fee_charged: boolean;
  fee_amount: number | null;
  brand_jacking: boolean;
  website: string | null;
  created_at: string;
}

function getD1(): D1Database {
  // next-on-pages exposes D1 bindings via process.env
  const db = (globalThis as any).process?.env?.DB;
  if (!db) throw new Error("D1 binding not available. Run `wrangler d1 create fake-intern-db` and `wrangler d1 execute fake-intern-db --local --file=./migrations/0001_init.sql`");
  return db;
}

export async function findCompanyBySlug(slug: string): Promise<Company | null> {
  const db = getD1();
  return db.prepare("SELECT * FROM companies WHERE slug = ?1").bind(slug).first<Company>();
}

export async function upsertCompany(slug: string, name: string): Promise<string> {
  const db = getD1();
  const existing = await db.prepare("SELECT id FROM companies WHERE slug = ?1").bind(slug).first<{ id: string }>();
  if (existing) return existing.id;
  const id = crypto.randomUUID();
  await db.prepare("INSERT INTO companies (id, slug, name) VALUES (?1, ?2, ?3)").bind(id, slug, name).run();
  return id;
}

export async function findReportsByCompanyId(companyId: string): Promise<Report[]> {
  const db = getD1();
  const result = await db.prepare("SELECT * FROM reports WHERE company_id = ?1 ORDER BY created_at DESC").bind(companyId).all<Report>();
  return result.results;
}

export async function createReport(data: {
  company_id: string;
  author: string;
  title: string;
  body: string;
  fee_charged: boolean;
  fee_amount: number | null;
  brand_jacking: boolean;
  website: string | null;
}): Promise<string> {
  const db = getD1();
  const id = crypto.randomUUID();
  await db.prepare(
    `INSERT INTO reports (id, company_id, author, title, body, fee_charged, fee_amount, brand_jacking, website)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
  ).bind(id, data.company_id, data.author, data.title, data.body, data.fee_charged ? 1 : 0, data.fee_amount, data.brand_jacking ? 1 : 0, data.website).run();
  return id;
}