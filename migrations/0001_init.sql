CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  domain_age_days INTEGER,
  mca_registered INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  author TEXT DEFAULT 'Anonymous',
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  fee_charged INTEGER DEFAULT 0,
  fee_amount INTEGER,
  brand_jacking INTEGER DEFAULT 0,
  website TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reports_company ON reports(company_id);