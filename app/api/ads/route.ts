import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { hyderabadAreas } from "@/data/profiles";
import { getUserAdStoreMode, readUserAds, writeUserAds } from "@/lib/user-ad-store";
import type { AdStatus, Area, UserAd } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const categories = ["Dinner Date", "Party Partner", "Travel Companion"] as const;
const statuses: AdStatus[] = ["Pending", "Approved", "Rejected"];
const fallbackImage =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&q=90";
const readCacheHeaders = {
  "Cache-Control": "private, max-age=15, stale-while-revalidate=300"
};
const writeCacheHeaders = {
  "Cache-Control": "no-store"
};

function text(value: unknown, max = 220) {
  return String(value ?? "").trim().slice(0, max);
}

function phone(value: unknown) {
  return text(value, 32).replace(/[^\d+]/g, "");
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function boundedNumber(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.trunc(parsed)));
}

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: writeCacheHeaders });
}

function revalidateAdViews() {
  revalidatePath("/ads");
  revalidatePath("/my-ads");
  revalidatePath("/admin/dashboard");
}

export async function GET(request: NextRequest) {
  const ownerId = text(request.nextUrl.searchParams.get("ownerId"), 100);
  const status = text(request.nextUrl.searchParams.get("status"), 20) as AdStatus;
  const limit = boundedNumber(request.nextUrl.searchParams.get("limit"), 100, 1, 100);
  const offset = boundedNumber(request.nextUrl.searchParams.get("offset"), 0, 0, 100000);
  const ads = await readUserAds();

  let rows = [...ads];
  if (ownerId) {
    rows = rows.filter((ad) => ad.ownerId === ownerId);
  }
  if (statuses.includes(status)) {
    rows = rows.filter((ad) => ad.status === status);
  }

  rows.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const total = rows.length;
  const page = rows.slice(offset, offset + limit);
  const nextOffset = offset + page.length < total ? offset + page.length : null;

  return NextResponse.json(
    { ads: page, storage: getUserAdStoreMode(), total, limit, offset, nextOffset },
    { headers: readCacheHeaders }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return bad("Invalid ad payload.");
  }

  const ownerId = text((body as Record<string, unknown>).ownerId, 100);
  const title = text((body as Record<string, unknown>).title, 90);
  const name = text((body as Record<string, unknown>).name, 48);
  const description = text((body as Record<string, unknown>).description, 900);
  const area = text((body as Record<string, unknown>).area, 40) as Area;
  const category = text((body as Record<string, unknown>).category, 40) as UserAd["category"];
  const age = Number((body as Record<string, unknown>).age);
  const price = Number((body as Record<string, unknown>).price);
  const image = text((body as Record<string, unknown>).image, 500) || fallbackImage;
  const contactPhone = phone((body as Record<string, unknown>).phone);
  const whatsapp = digits(phone((body as Record<string, unknown>).whatsapp) || contactPhone);
  const confirmedAdult = Boolean((body as Record<string, unknown>).confirmedAdult);

  if (!ownerId) return bad("Missing owner.");
  if (!title || !name || !description) return bad("Title, name, and description are required.");
  if (!hyderabadAreas.includes(area)) return bad("Select a valid Hyderabad area.");
  if (!categories.includes(category)) return bad("Select a valid category.");
  if (!Number.isFinite(age) || age < 18 || age > 65) return bad("Age must be 18 or above.");
  if (!Number.isFinite(price) || price < 1) return bad("Enter a valid price.");
  if (digits(contactPhone).length < 8) return bad("Enter a valid call number.");
  if (whatsapp.length < 8) return bad("Enter a valid WhatsApp number.");
  if (!confirmedAdult) return bad("Adult confirmation is required.");

  const now = new Date().toISOString();
  const ad: UserAd = {
    id: `ad-${randomUUID()}`,
    ownerId,
    title,
    name,
    age,
    area,
    category,
    price: Math.round(price),
    phone: contactPhone,
    whatsapp,
    image,
    description,
    status: "Pending",
    createdAt: now,
    updatedAt: now
  };

  const ads = await readUserAds();
  await writeUserAds([ad, ...ads]);
  revalidateAdViews();
  return NextResponse.json(
    { ad, storage: getUserAdStoreMode() },
    { status: 201, headers: writeCacheHeaders }
  );
}
