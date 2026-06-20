import { NextRequest, NextResponse } from "next/server";
import { hyderabadAreas } from "@/data/profiles";
import { getUserAdStoreMode, readUserAds, writeUserAds } from "@/lib/user-ad-store";
import type { AdStatus, Area, UserAd } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const categories = ["Dinner Date", "Party Partner", "Travel Companion"] as const;
const statuses: AdStatus[] = ["Pending", "Approved", "Rejected"];

function text(value: unknown, max = 220) {
  return String(value ?? "").trim().slice(0, max);
}

function phone(value: unknown) {
  return text(value, 32).replace(/[^\d+]/g, "");
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function canModerate(request: NextRequest) {
  const configuredPin = process.env.ADMIN_PIN || process.env.ADMIN_API_KEY;
  const providedPin = request.headers.get("x-admin-pin") || "";

  if (!configuredPin) {
    return process.env.NODE_ENV !== "production";
  }

  return providedPin === configuredPin;
}

function applyEditableFields(ad: UserAd, body: Record<string, unknown>): UserAd | NextResponse {
  const title = text(body.title, 90);
  const name = text(body.name, 48);
  const description = text(body.description, 900);
  const area = text(body.area, 40) as Area;
  const category = text(body.category, 40) as UserAd["category"];
  const age = Number(body.age);
  const price = Number(body.price);
  const image = text(body.image, 500);
  const contactPhone = phone(body.phone);
  const whatsapp = digits(phone(body.whatsapp) || contactPhone);

  if (!title || !name || !description) return bad("Title, name, and description are required.");
  if (!hyderabadAreas.includes(area)) return bad("Select a valid Hyderabad area.");
  if (!categories.includes(category)) return bad("Select a valid category.");
  if (!Number.isFinite(age) || age < 18 || age > 65) return bad("Age must be 18 or above.");
  if (!Number.isFinite(price) || price < 1) return bad("Enter a valid price.");
  if (digits(contactPhone).length < 8) return bad("Enter a valid call number.");
  if (whatsapp.length < 8) return bad("Enter a valid WhatsApp number.");

  return {
    ...ad,
    title,
    name,
    age,
    area,
    category,
    price: Math.round(price),
    phone: contactPhone,
    whatsapp,
    image: image || ad.image,
    description,
    status: "Pending",
    updatedAt: new Date().toISOString()
  };
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return bad("Invalid ad payload.");
  }

  const ads = await readUserAds();
  const index = ads.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Ad not found." }, { status: 404 });
  }

  const current = ads[index];
  const payload = body as Record<string, unknown>;
  const status = text(payload.status, 20) as AdStatus;

  if (statuses.includes(status)) {
    if (!canModerate(request)) {
      return NextResponse.json({ error: "Admin PIN is required." }, { status: 401 });
    }

    ads[index] = {
      ...current,
      status,
      updatedAt: new Date().toISOString()
    };
    await writeUserAds(ads);
    return NextResponse.json({ ad: ads[index], storage: getUserAdStoreMode() });
  }

  const ownerId = text(payload.ownerId, 100);
  if (!ownerId) {
    return bad("Missing owner.");
  }
  if (current.ownerId !== ownerId) {
    return NextResponse.json({ error: "You can only edit your own ads." }, { status: 403 });
  }

  const updated = applyEditableFields(current, payload);
  if (updated instanceof NextResponse) {
    return updated;
  }

  ads[index] = updated;
  await writeUserAds(ads);
  return NextResponse.json({ ad: updated, storage: getUserAdStoreMode() });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const ownerId = String(request.nextUrl.searchParams.get("ownerId") ?? "").trim();

  if (!ownerId) {
    return NextResponse.json({ error: "Missing owner." }, { status: 400 });
  }

  const ads = await readUserAds();
  const ad = ads.find((item) => item.id === id);

  if (!ad) {
    return NextResponse.json({ error: "Ad not found." }, { status: 404 });
  }

  if (ad.ownerId !== ownerId) {
    return NextResponse.json({ error: "You can only delete your own ads." }, { status: 403 });
  }

  await writeUserAds(ads.filter((item) => item.id !== id));
  return NextResponse.json({ ok: true, storage: getUserAdStoreMode() });
}
