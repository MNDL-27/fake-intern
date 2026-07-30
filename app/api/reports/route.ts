import { NextResponse } from "next/server";
import { upsertCompany, createReport } from "@/lib/db";

export const runtime = "edge";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  const body = await request.json();
  const { companyName, slug, author, title, body: reportBody, feeCharged, brandJacking, feeAmount, website } = body;

  if (!companyName || !title || !reportBody) {
    return NextResponse.json({ error: "Missing required fields: companyName, title, body" }, { status: 400 });
  }
  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const finalSlug = slugify(slug);
  if (!finalSlug) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const companyId = await upsertCompany(finalSlug, companyName);
  const id = await createReport({
    company_id: companyId,
    author: author || "Anonymous",
    title,
    body: reportBody,
    fee_charged: feeCharged ? true : false,
    fee_amount: feeCharged && feeAmount ? Number(feeAmount) : null,
    brand_jacking: brandJacking ? true : false,
    website: website || null,
  });

  return NextResponse.json({ id, slug: finalSlug, success: true });
}